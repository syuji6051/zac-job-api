import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { injectable } from 'inversify';
import { errors, logger } from '@syuji6051/zac-job-library';

import { Zac as IZac } from '@/src/usecases/zac';
import { GetWorkCodeListInput, RegisterWorksInput, SetWorkCodeListInput } from '@/src/usecases/inputs/zac';
import { WorkClockVoidOutput } from '@/src/usecases/outputs/works';
import { GetWorkCodeListOutput, VoidOutput } from '@/src/usecases/outputs/zac';
import { container, TYPES } from '@/src/providers/container';
import { Works as WorkStore } from '@/src/usecases/stores/works';
import ZacStore from '@/src/usecases/stores/zac';
import { Users as UserStore } from '@/src/usecases/stores/users';
import { publishRegisterZacWork } from '@/src/helper/sns';

dayjs.extend(utc);

@injectable()
export default class Zac implements IZac {
  workStore: WorkStore;

  zacStore: ZacStore;

  userStore: UserStore;

  constructor() {
    this.workStore = container.get<WorkStore>(TYPES.STORE_WORKS);
    this.userStore = container.get<UserStore>(TYPES.STORE_USERS);
    this.zacStore = container.get<ZacStore>(TYPES.STORE_ZAC);
  }

  public async linkAutoZacWorks(
    input: RegisterWorksInput, output: WorkClockVoidOutput,
  ) {
    const userId = input.getUserName();
    const day = input.getDay();
    const workYearMonth = Number(dayjs.utc(day).format('YYYYMM'));

    const work = await this.workStore.get(userId, day);
    const { zacTenantId, zacUserId, zacPassword } = await this.userStore.getUserInfo(userId);
    const defaultWorkCode = (await this.zacStore.getWorkCodeList(userId, workYearMonth))
      .find((code) => code.default)?.code;
    if (!defaultWorkCode) throw new Error('work code not found!');

    const zacWork = this.zacStore.convertToZacWork(day, work, defaultWorkCode);

    if (zacTenantId == null || zacPassword == null || zacUserId == null) {
      throw new Error('content of user-info is insufficient');
    }

    await publishRegisterZacWork({
      userId,
      zacTenantId,
      zacPassword,
      zacUserId,
      ...zacWork,
    });

    return output.success();
  }

  public async getWorkCodeList(
    input: GetWorkCodeListInput,
    output: GetWorkCodeListOutput,
  ) {
    const userId = input.getUserName();
    const yearMonth = input.getYearMonth();

    const workCodeList = await this.zacStore.getWorkCodeList(userId, yearMonth);
    return output.success(workCodeList);
  }

  public async setWorkCodeList(
    input: SetWorkCodeListInput,
    output: VoidOutput,
  ) {
    const userId = input.getUserName();
    const yearMonth = input.getYearMonth();
    const workCodeList = input.getWorkCodeList();
    logger.debug(JSON.stringify(workCodeList));

    const uniqueKeys = workCodeList
      .map(({ code }) => code)
      .filter((val, index, self) => self.indexOf(val) === index);
    logger.debug(uniqueKeys);

    if (workCodeList.length !== uniqueKeys.length) {
      throw new errors.ValidationError('work code unique key error');
    }

    await this.zacStore.setWorkCodeList(userId, yearMonth, workCodeList);
    return output.success();
  }
}
