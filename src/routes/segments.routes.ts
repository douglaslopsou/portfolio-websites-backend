import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import SegmentsRepository from '../repositories/SegmentsRepository';
import CreateSegmentService from '../services/CreateSegmentService';

// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const segmentsRouter = Router();

// appointmentsRouter.use(ensureAuthenticated);

segmentsRouter.get('/', async (request, response) => {
  const segmentsRepository = getCustomRepository(SegmentsRepository);
  const segments = await segmentsRepository.find();

  return response.json(segments);
});

segmentsRouter.post('/', async (request, response) => {
  const { segment_name } = request.body;

  const createSegment = new CreateSegmentService();

  const segment = await createSegment.execute({
    segment_name,
  });

  return response.json(segment);
});

export default segmentsRouter;
