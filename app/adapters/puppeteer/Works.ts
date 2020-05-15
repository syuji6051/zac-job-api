import { injectable } from "inversify";
import { Works as IWorks } from 'app/usecases/stores/Works';
import { Works as WorksAPI } from '../../puppeteer/Works';
import { Work as WorkDB } from '../../database/Work';
import { Work as WEntitiesWork, Work } from 'app/entities/Works';

@injectable()
export class Works implements IWorks {
  private workApi: WorksAPI;
  private workDB: WorkDB;

  constructor() {
    this.workApi = new WorksAPI();
    this.workDB = new WorkDB();
  }

  public list(userId: string, password: string, yearMonth: string): Promise<WEntitiesWork[]> {
    return this.workApi.list(userId, password, yearMonth);
  }

  public async put(userId: string, works: Work[]): Promise<void> {
    return this.workDB.setWork(userId, works);
  }
}