import { injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';

import { Works as WorkStore } from '@/src/usecases/stores/works';
import { Users as UserStore } from '@/src/usecases/stores/users';
import { Works as IWorks } from '@/src/usecases/works';
import { GetWorkListOutput, WorkClockVoidOutput } from '@/src/adapters/http/response/works';
import { GetWorkListInput, PunchWorkInput } from '@/src/usecases/inputs/works';
import { container, TYPES } from '@/src/providers/container';
import { publishPunchWork, syncObcWorks } from '@/src/helper/sns';
import { SyncObcWorksInput } from '@/src/adapters/http/request/works';

@injectable()
export default class Works implements IWorks {
  private workStore: WorkStore;

  userStore: UserStore;

  constructor() {
    this.workStore = container.get<WorkStore>(TYPES.STORE_WORKS);
    this.userStore = container.get<UserStore>(TYPES.STORE_USERS);
  }

  public async workSync(
    input: SyncObcWorksInput, output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserName();
    const period = input.getYearMonth();
    const { obcTenantId, obcUserId, obcPassword } = await this.userStore.getUserInfo(userId);

    if (obcTenantId == null || obcUserId == null || obcPassword == null) {
      throw new Error('content of user-info is insufficient');
    }
    await syncObcWorks({
      userId, obcTenantId, obcUserId, obcPassword, period,
    });
    return output.success();
  }

  public async getWorkList(
    input: GetWorkListInput, output: GetWorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserName();
    const works = await this.workStore.getWorkList(userId, input.getYearMonth());
    return output.success(works);
  }

  public async punchWork(
    input: PunchWorkInput, output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserName();
    const { workType } = input.getContent();
    const { obcTenantId, obcUserId, obcPassword } = await this.userStore.getUserInfo(userId);

    if (obcTenantId == null || obcUserId == null || obcPassword == null) {
      throw new Error('content of user-info is insufficient');
    }
    await publishPunchWork({
      userId, obcTenantId, obcUserId, obcPassword, workType,
    });
    return output.success();
  }
}
