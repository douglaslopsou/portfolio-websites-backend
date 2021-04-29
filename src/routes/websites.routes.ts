import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import WebsitesRepository from '../repositories/WebsitesRepository';
import CreateWebsiteService from '../services/CreateWebsiteService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const websitesRouter = Router();

// appointmentsRouter.use(ensureAuthenticated);

websitesRouter.get('/', async (request, response) => {
  const websitesRepository = getCustomRepository(WebsitesRepository);
  const websites = await websitesRepository.find();

  return response.json(websites);
});

websitesRouter.get('/chunks', async (request, response) => {
  // const { chunks } = request.params;
  const websitesRepository = getCustomRepository(WebsitesRepository);
  const websitesChunks = await websitesRepository.findChunks();

  return response.json(websitesChunks);
});

websitesRouter.post('/', async (request, response) => {
  const {
    customer,
    plan,
    segment_id,
    website_address,
    amount_paid,
    salesman,
  } = request.body;

  const createWebsite = new CreateWebsiteService();

  const website = await createWebsite.execute({
    customer,
    plan,
    segment_id,
    website_address,
    amount_paid,
    salesman,
  });

  return response.json(website);
});

export default websitesRouter;
