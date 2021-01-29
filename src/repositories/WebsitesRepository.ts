import { EntityRepository, Repository } from 'typeorm';
import Website from '../models/Website';

@EntityRepository(Website)
class WebsitesRepository extends Repository<Website> {
  public async findBySegment(segment: string): Promise<Website | null> {
    const findWebsite = await this.findOne({
      where: { segment },
    });

    return findWebsite || null;
  }
}

export default WebsitesRepository;
