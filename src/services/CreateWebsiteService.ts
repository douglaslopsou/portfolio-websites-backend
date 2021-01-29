import { getCustomRepository } from 'typeorm';
import axios from 'axios';
import Website from '../models/Website';
import WebsitesRepository from '../repositories/WebsitesRepository';

import AppError from '../erros/AppError';

interface Request {
  customer: string;
  plan: string;
  segment_id: string;
  website_address: string;
  thumbnail: string;
  amount_paid: string;
  salesman: string;
}

class CreateWebsiteService {
  public async execute({
    customer,
    plan,
    segment_id,
    website_address,
    amount_paid,
    salesman,
  }: Request): Promise<Website> {
    const websitesRepository = getCustomRepository(WebsitesRepository);

    if (!website_address) throw new AppError('Website address is empty!');

    const checkWebsiteExists = await websitesRepository.findOne({
      where: { website_address },
    });

    if (checkWebsiteExists) {
      throw new AppError('Website already registered');
    }

    try {
      const response = await axios.get(
        'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
        {
          params: { url: website_address },
        },
      );

      const thumbnailGoogle =
        response.data.lighthouseResult.audits['final-screenshot'].details.data;

      const website = websitesRepository.create({
        customer,
        plan,
        segment_id,
        website_address,
        thumbnail: thumbnailGoogle,
        amount_paid,
        salesman,
      });

      await websitesRepository.save(website);

      return website;
    } catch (err) {
      throw new AppError('Error in generate thumbnail from Google API.', 401);
    }
  }
}

export default CreateWebsiteService;
