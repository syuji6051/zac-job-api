import { injectable } from 'inversify';
import { Works as IWorks } from '@/usecases/stores/Works';
import { Work as WEntitiesWork, Work } from '@/entities/Works';
import { Works as WorksAPI } from '@/puppeteer/Works';
import { Work as WorkDB } from '@/database/Work';

@injectable()
export default class Works implements IWorks {
  private workApi: WorksAPI;

  private workDB: WorkDB;

  constructor() {
    this.workApi = new WorksAPI();
    this.workDB = new WorkDB();
  }

  public list(userId: string, password: string, yearMonth: string): Promise<WEntitiesWork[]> {
    return this.workApi.list(userId, password, yearMonth);
  }

  public clockIn(userId: string, password: string): Promise<void> {
    return this.workApi.clockIn(userId, password);
  }

  public clockOut(userId: string, password: string): Promise<void> {
    return this.workApi.clockOut(userId, password);
  }

  public goOut(userId: string, password: string): Promise<void> {
    return this.workApi.goOut(userId, password);
  }

  public goReturn(userId: string, password: string): Promise<void> {
    return this.workApi.goReturn(userId, password);
  }

  public async put(userId: string, works: Work[]): Promise<void> {
    return this.workDB.setWork(userId, works);
  }
}
