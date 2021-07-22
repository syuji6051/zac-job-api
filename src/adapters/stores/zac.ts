import { injectable } from 'inversify';

import IZac from '@/src/usecases/stores/zac';
import Puppeteer from '@/src/puppeteer/zac';
import { WorkCode, ZacWork } from '@/src/entities/zac';
import { ZacWorkCode as DynamoDB } from '@/src/database/zac-work-code';
import { logger } from '@syuji6051/zac-job-library';

@injectable()
export default class Zac implements IZac {
  private puppeteer: Puppeteer;

  private database: DynamoDB;

  constructor() {
    this.puppeteer = new Puppeteer();

    this.database = new DynamoDB();
  }

  public async register(props: ZacWork) {
    await this.puppeteer.register(props);
  }

  async getWorkCodeList(userId: string, yearMonth: number) {
    try {
      return this.database.get(userId, yearMonth);
    } catch (err) {
      logger.error(err.stack);
      throw err;
    }
  }

  async setWorkCodeList(userId: string, yearMonth: number, workCodeList: WorkCode[]) {
    try {
      await this.database.set(userId, yearMonth, workCodeList);
    } catch (err) {
      logger.error(err.stack);
      throw err;
    }
  }
}
