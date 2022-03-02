import { injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';

import { Works as WorkStore } from '@/src/usecases/stores/works';
import { Users as UserStore } from '@/src/usecases/stores/users';
import { Works as IWorks } from '@/src/usecases/works';
import { WorkListOutput, WorkClockVoidOutput } from '@/src/adapters/http/response/works';
import { WorkListInput, PunchWorkInput } from '@/src/usecases/inputs/works';
import { container, TYPES } from '@/src/providers/container';
import { publishPunchWork } from '@/src/helper/sns';

@injectable()
export default class Works implements IWorks {
  private workStore: WorkStore;

  userStore: UserStore;

  constructor() {
    this.workStore = container.get<WorkStore>(TYPES.STORE_WORKS);
    this.userStore = container.get<UserStore>(TYPES.STORE_USERS);
  }

  public async workSync(
    input: WorkListInput, output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserId();
    const works = await this.workStore.obcWorkList(userId, input.getYearMonth());

    await this.workStore.put(userId, works);
    return output.success();
  }

  public async workList(
    input: WorkListInput, output: WorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserId();
    const works = await this.workStore.workList(userId, input.getYearMonth());
    return output.success(works);
  }

  public async punchWork(
    input: PunchWorkInput, output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserName();
    const { workType } = input.getContent();
    const { obcTenantId, obcUserId, obcPassword } = await this.userStore.getUserInfo(userId);
    console.log(obcTenantId, obcUserId, obcPassword);
    if (obcTenantId == null || obcUserId == null || obcPassword == null) {
      throw new Error('content of user-info is insufficient');
    }
    await publishPunchWork({
      userId, obcTenantId, obcUserId, obcPassword, workType,
    });
    return output.success();
  }
}
