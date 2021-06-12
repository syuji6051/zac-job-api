import { APIGatewayProxyResult } from 'aws-lambda';
import {
  WorkListOutput as IWorkListOutput,
  WorkClockVoidOutput as IWorkClockVoidOutput,
} from '@/src/usecases/outputs/works';
import { success } from '@/src/views/response';
import { WorkRecord } from '@/src/entities/dynamodb/works';

export class WorkListOutput implements IWorkListOutput {
  public success(works: WorkRecord[]): APIGatewayProxyResult {
    return success(works
      .filter((work) => work.clockIn || work.clockOut)
      .map((work) => ({
        day: work.day,
        clock_in: work.clockIn,
        clock_out: work.clockOut,
        go_out_1: work.goOut1,
        returned_1: work.returned1,
        go_out_2: work.goOut1,
        returned_2: work.returned1,
        go_out_3: work.goOut1,
        returned_3: work.returned1,
      })));
  }
}

export class WorkClockVoidOutput implements IWorkClockVoidOutput {
  public success(): APIGatewayProxyResult {
    return success({});
  }
}
