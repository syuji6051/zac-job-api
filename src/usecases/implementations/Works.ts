import { injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';

import { Users as UserInfoStore } from '@/usecases/stores/UserInfo';
import { Works as WorkStore } from '@/usecases/stores/Works';
import { Works as IWorks } from '@/usecases/Works';
import {
  WorkListOutput, WorkClockInOutput, WorkClockOutOutput, WorkGoOutOutput, WorkGoReturnOutput,
} from '@/adapters/http/response/Works';
import {
  WorkListInput, WorkClockInInput, WorkClockOutInput, WorkGoOutInput, WorkGoReturnInput,
} from '@/usecases/inputs/Works';

import { container, TYPES } from '@/providers/container';

@injectable()
export default class Works implements IWorks {
  private userStore: UserInfoStore;

  private workStore: WorkStore;

  constructor() {
    this.userStore = container.get<UserInfoStore>(TYPES.STORE_USERS);
    this.workStore = container.get<WorkStore>(TYPES.STORE_WORKS);
  }

  public async workSync(
    input: WorkListInput,
    output: WorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    const works = await this.workStore.list(obcUserId!, obcPassword!, input.getYearMonth());

    await this.workStore.put(obcUserId!, works);
    return output.success();
  }

  public async clockIn(
    input: WorkClockInInput,
    output: WorkClockInOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    await this.workStore.clockIn(obcUserId!, obcPassword!);
    return output.success();
  }

  public async clockOut(
    input: WorkClockOutInput,
    output: WorkClockOutOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    await this.workStore.clockOut(obcUserId!, obcPassword!);
    return output.success();
  }

  public async goOut(
    input: WorkGoOutInput,
    output: WorkGoOutOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    await this.workStore.goOut(obcUserId!, obcPassword!);
    return output.success();
  }

  public async goReturn(
    input: WorkGoReturnInput,
    output: WorkGoReturnOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    await this.workStore.goReturn(obcUserId!, obcPassword!);
    return output.success();
  }
}
