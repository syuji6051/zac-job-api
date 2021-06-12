import { injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';

import { Works as WorkStore } from '@/src/usecases/stores/works';
import { Works as IWorks } from '@/src/usecases/works';
import {
  WorkListOutput, WorkClockVoidOutput,
} from '@/src/adapters/http/response/works';
import {
  WorkListInput,
} from '@/src/usecases/inputs/works';

import { container, TYPES } from '@/src/providers/container';

@injectable()
export default class Works implements IWorks {
  private workStore: WorkStore;

  constructor() {
    this.workStore = container.get<WorkStore>(TYPES.STORE_WORKS);
  }

  public async workSync(
    input: WorkListInput,
    output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserId();
    const works = await this.workStore.obcWorkList(userId, input.getYearMonth());

    await this.workStore.put(userId, works);
    return output.success();
  }

  public async workList(
    input: WorkListInput,
    output: WorkListOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserId();
    const works = await this.workStore.workList(userId, input.getYearMonth());
    return output.success(works);
  }

  public async clockIn(
    input: WorkListInput,
    output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserId();

    await this.workStore.clockIn(userId);
    return output.success();
  }

  public async clockOut(
    input: WorkListInput,
    output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserId();

    await this.workStore.clockOut(userId);
    return output.success();
  }

  public async goOut(
    input: WorkListInput,
    output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserId();

    await this.workStore.goOut(userId);
    return output.success();
  }

  public async goReturn(
    input: WorkListInput,
    output: WorkClockVoidOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserId();

    await this.workStore.goReturn(userId);
    return output.success();
  }
}
