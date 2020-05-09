import { injectable } from "inversify";
import { Works as IWorks } from 'app/usecases/stores/Works';
import { Works as WorksAPI } from '../../puppeteer/Works';
import { Work as WEntitiesWork } from 'app/entities/Works';

@injectable()
export class Works implements IWorks {
  private works: WorksAPI;

  constructor() {
    this.works = new WorksAPI()
  }

  public list(userId: string, password: string, yearMonth: string): Promise<WEntitiesWork[]> {
    return this.works.list(userId, password, yearMonth);
  }
}