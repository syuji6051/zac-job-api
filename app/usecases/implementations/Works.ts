import { injectable } from "inversify";
import { Users as UserInfoStore } from 'app/usecases/stores/UserInfo';
import { Works as WorkStore } from 'app/usecases/stores/Works';
import { Works as IWorks } from 'app/usecases/Works';
import { WorkListOutput } from "app/adapters/http/response/Works";
import { WorkListInput } from "app/usecases/inputs/Works";
import { APIGatewayProxyResult } from "aws-lambda";
import { container, TYPES } from "../../providers/container";

@injectable()
export class Works implements IWorks {
  private userStore: UserInfoStore;
  private workStore: WorkStore;

  constructor() {
    this.userStore = container.get<UserInfoStore>(TYPES.STORE_USERS)
    this.workStore = container.get<WorkStore>(TYPES.STORE_WORKS)
  }

  public async workSync(
    input: WorkListInput,
    output: WorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    const works = await (async () => {
      try {
        const works = await this.workStore.list(obcUserId!, obcPassword!, input.getYearMonth());
        return works;
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      }
    })();
    console.log(works);

    await this.workStore.put(obcUserId!, works);
    return output.success();
  }

  public async clockIn(
    input: WorkListInput,
    output: WorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    await this.workStore.clockIn(obcUserId!, obcPassword!);
    return output.success();
  }

  public async clockOut(
    input: WorkListInput,
    output: WorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    await this.workStore.clockOut(obcUserId!, obcPassword!);
    return output.success();
  }

  public async goOut(
    input: WorkListInput,
    output: WorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    await this.workStore.goOut(obcUserId!, obcPassword!);
    return output.success();
  }

  public async goReturn(
    input: WorkListInput,
    output: WorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword } = await this.userStore.get(input.getUserId());

    await this.workStore.goReturn(obcUserId!, obcPassword!);
    return output.success();
  }
}
