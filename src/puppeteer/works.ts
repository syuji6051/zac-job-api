import { logger, request } from '@syuji6051/zac-job-library';
import { container, TYPES } from '@/src/providers/container';
import { SecretsValues } from '@/src/entities/environments';
import { WorkType } from '@/src/entities/works';

export default class Works {
  secrets: SecretsValues;

  constructor() {
    this.secrets = container.get<SecretsValues>(TYPES.ASM_VALUES);
  }

  public async list(userId: string, yearMonth: string) {
    logger.debug('works api call start');
    return request({
      url: `${this.secrets.PUPPETEER_API_URL}/works/list`,
      method: 'GET',
      params: {
        user_id: userId, period: yearMonth,
      },
    }).then((res) => res.data);
  }

  public async clockIn(userId: string) {
    logger.debug('works api call start');
    return request({
      url: `${this.secrets.PUPPETEER_API_URL}/works/clock-in`,
      method: 'POST',
      data: {
        userId,
      },
    }).then((res) => res.data);
  }

  public async clockOut(userId: string) {
    logger.debug('works api call start');
    return request({
      url: `${this.secrets.PUPPETEER_API_URL}/works/clock-out`,
      method: 'POST',
      data: {
        userId,
      },
    }).then((res) => res.data);
  }

  public async goOut(userId: string) {
    logger.debug('works api call start');
    return request({
      url: `${this.secrets.PUPPETEER_API_URL}/works/go-out`,
      method: 'POST',
      data: {
        userId,
      },
    }).then((res) => res.data);
  }

  public async goReturn(userId: string) {
    logger.debug('works api call start');
    return request({
      url: `${this.secrets.PUPPETEER_API_URL}/works/go-return`,
      method: 'POST',
      data: {
        userId,
      },
    }).then((res) => res.data);
  }

  public async workPunch(userId: string, workType: WorkType) {
    switch (workType) {
      case 'clockIn':
        await this.clockIn(userId);
        break;
      case 'clockOut':
        await this.clockOut(userId);
        break;
      case 'goOut':
        await this.goOut(userId);
        break;
      case 'returned':
        await this.goReturn(userId);
        break;
      default:
    }
  }
}
