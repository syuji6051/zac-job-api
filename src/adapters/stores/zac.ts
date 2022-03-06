import { injectable } from 'inversify';
import dayjs from 'dayjs';
import { ZacRegisterParams } from '@syuji6051/zac-client';
import { errors, logger } from '@syuji6051/zac-job-library';

import { round, convert60to10minute, covertWorkMinute } from '@/src/helper/day';
import IZac from '@/src/usecases/stores/zac';
import { WorkCode } from '@/src/entities/zac';
import { ZacWorkCode as DynamoDB } from '@/src/database/zac-work-code';
import { WorkRecord } from '@/src/entities/dynamodb/works';

@injectable()
export default class Zac implements IZac {
  private database: DynamoDB;

  constructor() {
    this.database = new DynamoDB();
  }

  public convertToZacWork(
    inputDay: Date, work: WorkRecord, defaultWorkCode: string,
  ): ZacRegisterParams {
    if (!work || !work.clockIn || !work.clockOut || !work.flexTotalTime) {
      throw new errors.ValidationError('obc work data is invalid');
    }
    const workStartDay = dayjs.utc(inputDay).format('YYYY/MM/DD');
    const workStart = round(dayjs(`${workStartDay} ${work.clockIn}`, 'YYYY/MM/DD H:mm'), 15, true);
    const workEnd = round(dayjs(`${workStartDay} ${work.clockOut}`, 'YYYY/MM/DD H:mm'), 15, false);
    const totalTime = round(dayjs(`${workStartDay} ${work.flexTotalTime}`, 'YYYY/MM/DD H:mm'), 15, false);

    const workTime = convert60to10minute(totalTime.format('H:mm'));

    const diff = workEnd.diff(workStart, 'minute');
    const adjustTime = diff - (workTime * 60);
    return {
      workDate: inputDay,
      workStartHour: Number(workStart.format('H')),
      workStartMinute: covertWorkMinute(Number(workStart.format('mm'))),
      workEndHour: Number(workEnd.format('H')),
      workEndMinute: covertWorkMinute(Number(workEnd.format('mm'))),
      workBreakHour: Math.trunc(adjustTime / 60),
      workBreakMinute: covertWorkMinute(Math.trunc(adjustTime % 60)),
      works: [{
        code: defaultWorkCode,
        hour: Math.trunc((diff - adjustTime) / 60),
        minute: covertWorkMinute((diff - adjustTime) % 60),
      }],
    };
  }

  async getWorkCodeList(userId: string, yearMonth: number) {
    return this.database.get(userId, yearMonth).catch((err) => {
      logger.error(err.stack);
      throw err;
    });
  }

  async setWorkCodeList(userId: string, yearMonth: number, workCodeList: WorkCode[]) {
    await this.database.set(userId, yearMonth, workCodeList).catch((err) => {
      logger.error(err.stack);
      throw err;
    });
  }
}
