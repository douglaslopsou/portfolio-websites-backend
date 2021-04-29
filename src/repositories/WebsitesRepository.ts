import { EntityRepository, Repository } from 'typeorm';
import Website from '../models/Website';

// TESTE ARRAY CHUNCK
function chunkArray(myArray: Website[], chunkSize: number): Website[][] {
  let index = 0;
  const arrayLength = myArray.length;
  const tempArray = [];
  let myChunk: Website[];

  for (index = 0; index < arrayLength; index += chunkSize) {
    myChunk = myArray.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
}
// FIM TESTE ARRAY CHUNCK

@EntityRepository(Website)
class WebsitesRepository extends Repository<Website> {
  public async findBySegment(segment: string): Promise<Website | null> {
    const findWebsite = await this.findOne({
      where: { segment },
    });

    return findWebsite || null;
  }

  public async findChunks(): Promise<Website[][] | null> {
    const websites = await this.find();

    const findChunks = chunkArray(websites, 4);

    return findChunks || null;
  }
}

export default WebsitesRepository;
