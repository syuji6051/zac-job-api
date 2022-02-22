import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { between } from '@aws/dynamodb-expressions';
import { Work as IWork } from '@/src/entities/works';
import mapper from '@/src/database/dynamo-mapper';
import { WorkRecord } from '@/src/entities/dynamodb/works';
import { logger } from '@syuji6051/zac-job-library';

dayjs.extend(utc);
// eslint-disable-next-line import/prefer-default-export
export class Work {
  public async list(userId: string, yearMonth: string): Promise<WorkRecord[]> {
    const startDate = dayjs.utc(yearMonth, 'YYYY-MM');
    const endDate = startDate.clone().endOf('month');
    const startTime = Math.trunc(startDate.valueOf() / 1000);
    const endTime = Math.trunc(endDate.valueOf() / 1000);
    logger.info(`startDate: ${startTime}`);
    logger.info(`endDate: ${endTime}`);
    const works: WorkRecord[] = [];
    for await (const work of mapper.query(WorkRecord, {
      userId, day: between(startTime, endTime),
    })) {
      works.push(work);
    }
    return works;
  }

  public async get(userId: string, day: Date): Promise<WorkRecord> {
    try {
      // eslint-disable-next-line new-parens
      return mapper.get(Object.assign(new WorkRecord, { userId, day }));
    } catch (err) {
      if (err instanceof Error) {
        logger.debug(err.stack);
      }
      throw err;
    }
  }

  public async setWork(userId: string, works: IWork[]): Promise<void> {
    const toSave = works.map((work) => {
      const flexTotalTime = work.flexTotalTime?.replace('時間', ':')
        .replace('分', '');
      return Object.assign(new WorkRecord(), {
        userId,
        day: dayjs.utc(work.day, 'YYYY-MM-DD').toDate(),
        clockIn: work.clockIn ?? undefined,
        clockOut: work.clockOut ?? undefined,
        returned1: work.returned1 ?? undefined,
        goOut1: work.goOut1 ?? undefined,
        returned2: work.returned2 ?? undefined,
        goOut2: work.goOut2 ?? undefined,
        returned3: work.returned3 ?? undefined,
        goOut3: work.goOut3 ?? undefined,
        flexTotalTime,
      });
    });
    for await (const persisted of mapper.batchPut(toSave)) {
      console.log('work batch put success', persisted);
    }
  }
}
