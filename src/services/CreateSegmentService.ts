import { getCustomRepository } from 'typeorm';
import Segment from '../models/Segment';
import SegmentsRepository from '../repositories/SegmentsRepository';

import AppError from '../erros/AppError';

interface Request {
  segment_name: string;
}

class CreateSegmentService {
  public async execute({ segment_name }: Request): Promise<Segment> {
    const segmentsRepository = getCustomRepository(SegmentsRepository);

    if (!segment_name) throw new AppError('Segment name is empty!');

    const checkSegmentExists = await segmentsRepository.findOne({
      where: { segment_name },
    });

    if (checkSegmentExists) {
      throw new AppError('Segment already registered');
    }

    const segment = segmentsRepository.create({
      segment_name,
    });

    await segmentsRepository.save(segment);

    return segment;
  }
}

export default CreateSegmentService;
