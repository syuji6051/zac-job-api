import dayjs from 'dayjs';
import { injectable } from 'inversify';
import { errors } from '@syuji6051/zac-job-library';

import { Zac as IZac } from '@/src/usecases/zac';
import { RegisterWorksInput } from '@/src/usecases/inputs/zac';
import { WorkClockVoidOutput } from '@/src/usecases/outputs/works';
import { container, TYPES } from '@/src/providers/container';
import { Works as WorkStore } from '@/src/usecases/stores/works';
import ZacStore from '@/src/usecases/stores/zac';
import { covertWorkMinute, round } from '@/src/helper/day';

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
    if (!work || !work.clockIn || !work.clockOut) {
      throw new errors.ValidationError('obc work data is invalid');
    }
    const workStartDay = dayjs(day).format('YYYY/MM/DD');
    const workStart = round(dayjs(`${workStartDay} ${work.clockIn}`, 'YYYY/MM/DD H:mm'), 15, true);
    const workEnd = round(dayjs(`${workStartDay} ${work.clockOut}`, 'YYYY/MM/DD H:mm'), 15, false);

    console.log(workStart);
    console.log(workEnd);

    const diff = workEnd.diff(workStart, 'minute');

    await this.zacStore.register({
      userId,
      workDate: day,
      workStartHour: Number(workStart.format('H')),
      workStartMinute: covertWorkMinute(Number(workStart.format('mm'))),
      workEndHour: Number(workEnd.format('H')),
      workEndMinute: covertWorkMinute(Number(workEnd.format('mm'))),
      workBreakHour: 0,
      workBreakMinute: 0,
      works: [{
        code: '111',
        hour: Math.trunc(diff / 60),
        minute: covertWorkMinute(diff % 60),
      }],
    });

    return output.success();
  }
}
