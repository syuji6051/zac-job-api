import { injectable } from 'inversify';
import dayjs from 'dayjs';

import { Works as IWorks } from '@/src/usecases/stores/works';
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

  public getWorkList(userId: string, yearMonth: number): Promise<WorkRecord[]> {
    return this.database.list(userId, yearMonth);
  }

  public async get(userId: string, day: Date): Promise<WorkRecord> {
    return this.database.get(userId, dayjs(day).local().toDate());
  }
}
