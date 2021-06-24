import { injectable } from 'inversify';

import IZac from '@/src/usecases/stores/zac';
import Puppeteer from '@/src/puppeteer/zac';
import { ZacWork } from '@/src/entities/zac';

@injectable()
export default class Zac implements IZac {
  private puppeteer: Puppeteer;

  constructor() {
    this.puppeteer = new Puppeteer();
  }

  public async register(props: ZacWork) {
    await this.puppeteer.register(props);
  }
}
