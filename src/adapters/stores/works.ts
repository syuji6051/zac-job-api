import { injectable } from 'inversify';
import dayjs from 'dayjs';

import { Works as IWorks } from '@/src/usecases/stores/works';
import { Work as EntitiesWork, Work } from '@/src/entities/works';
import Puppeteer from '@/src/puppeteer/works';
import { Work as DynamoDB } from '@/src/database/works';
import { WorkRecord } from '@/src/entities/dynamodb/works';

@injectable()
export default class Works implements IWorks {
  private puppeteer: Puppeteer;

  private database: DynamoDB;

  constructor() {
    this.puppeteer = new Puppeteer();
    this.database = new DynamoDB();
  }

  public obcWorkList(userId: string, yearMonth: string): Promise<EntitiesWork[]> {
    return this.puppeteer.list(userId, yearMonth);
  }

  public workList(userId: string, yearMonth: string): Promise<WorkRecord[]> {
    return this.database.list(userId, yearMonth);
  }

  public clockIn(userId: string): Promise<void> {
    return this.puppeteer.clockIn(userId);
  }

  public clockOut(userId: string): Promise<void> {
    return this.puppeteer.clockOut(userId);
  }

  public goOut(userId: string): Promise<void> {
    return this.puppeteer.goOut(userId);
  }

  public goReturn(userId: string): Promise<void> {
    return this.puppeteer.goReturn(userId);
  }

  public async put(userId: string, works: Work[]): Promise<void> {
    return this.database.setWork(userId, works);
  }

  public async get(userId: string, day: Date): Promise<WorkRecord> {
    return this.database.get(userId, dayjs(day).local().toDate());
  }
}
