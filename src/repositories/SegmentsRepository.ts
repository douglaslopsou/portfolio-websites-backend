import { EntityRepository, Repository } from 'typeorm';

import Segment from '../models/Segment';

@EntityRepository(Segment)
class SegmentsRepository extends Repository<Segment> {
  public async findById(id: string): Promise<Segment | null> {
    const findSegment = await this.findOne({
      where: { id },
    });

    return findSegment || null;
  }
}

export default SegmentsRepository;
