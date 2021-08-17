import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'inversify';
import { errors } from '@syuji6051/zac-job-library';

import { Zac as IZac } from '@/src/usecases/zac';
import { GetWorkCodeListInput, RegisterWorksInput, SetWorkCodeListInput } from '@/src/usecases/inputs/zac';
import { WorkClockVoidOutput } from '@/src/usecases/outputs/works';
import { GetWorkCodeListOutput, VoidOutput } from '@/src/usecases/outputs/zac';
import { container, TYPES } from '@/src/providers/container';
import { Works as WorkStore } from '@/src/usecases/stores/works';
import ZacStore from '@/src/usecases/stores/zac';
import {
  convert60to10minute, covertWorkMinute, round,
} from '@/src/helper/day';

dayjs.extend(utc);

@injectable()
export default class Zac implements IZac {
  workStore: WorkStore;

  zacStore: ZacStore;

  constructor() {
    this.workStore = container.get<WorkStore>(TYPES.STORE_WORKS);
    this.zacStore = container.get<ZacStore>(TYPES.STORE_ZAC);
  }

  public async registerWorks(
    input: RegisterWorksInput,
    output: WorkClockVoidOutput,
  ) {
    const userId = input.getUserId();
    const day = input.getDay();
    const work = await this.workStore.get(userId, day);
    if (!work || !work.clockIn || !work.clockOut || !work.flexTotalTime) {
      throw new errors.ValidationError('obc work data is invalid');
    }
    const workStartDay = dayjs.utc(day).format('YYYY/MM/DD');
    const workStart = round(dayjs(`${workStartDay} ${work.clockIn}`, 'YYYY/MM/DD H:mm'), 15, true);
    const workEnd = round(dayjs(`${workStartDay} ${work.clockOut}`, 'YYYY/MM/DD H:mm'), 15, false);
    const totalTime = round(dayjs(`${workStartDay} ${work.flexTotalTime}`, 'YYYY/MM/DD H:mm'), 15, false);

    console.log(workStart);
    console.log(workEnd);
    const workTime = convert60to10minute(totalTime.format('H:mm'));

    const diff = workEnd.diff(workStart, 'minute');
    const adjustTime = diff - (workTime * 60);

    await this.zacStore.register({
      userId,
      workDate: day,
      workStartHour: Number(workStart.format('H')),
      workStartMinute: covertWorkMinute(Number(workStart.format('mm'))),
      workEndHour: Number(workEnd.format('H')),
      workEndMinute: covertWorkMinute(Number(workEnd.format('mm'))),
      workBreakHour: Math.trunc(adjustTime / 60),
      workBreakMinute: covertWorkMinute(Math.trunc(adjustTime % 60)),
      works: [{
        code: '0603805',
        hour: Math.trunc((diff - adjustTime) / 60),
        minute: covertWorkMinute((diff - adjustTime) % 60),
      }],
    });

    return output.success();
  }

  public async getWorkCodeList(
    input: GetWorkCodeListInput,
    output: GetWorkCodeListOutput,
  ) {
    const userId = input.getUserId();
    const yearMonth = input.getYearMonth();

    const workCodeList = await this.zacStore.getWorkCodeList(userId, yearMonth);
    return output.success(workCodeList);
  }

  public async setWorkCodeList(
    input: SetWorkCodeListInput,
    output: VoidOutput,
  ) {
    const userId = input.getUserId();
    const yearMonth = input.getYearMonth();
    const workCodeList = input.getWorkCodeList();

    await this.zacStore.setWorkCodeList(userId, yearMonth, workCodeList);
    return output.success();
  }
}
