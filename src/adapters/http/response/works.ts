import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { APIGatewayProxyResult } from 'aws-lambda';
import { views } from '@syuji6051/zac-job-library';

import {
  WorkListOutput as IWorkListOutput,
  WorkClockVoidOutput as IWorkClockVoidOutput,
} from '@/src/usecases/outputs/works';
import { WorkRecord } from '@/src/entities/dynamodb/works';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.tz.setDefault('Asia/Tokyo');
export class WorkListOutput implements IWorkListOutput {
  public success(works: WorkRecord[]): APIGatewayProxyResult {
    return views.success(works
      .filter((work) => work.clockIn || work.clockOut)
      .map((work) => ({
        day: dayjs.utc(work.day).local().format('YYYY-MM-DD'),
        clock_in: work.clockIn,
        clock_out: work.clockOut,
        go_out_1: work.goOut1,
        returned_1: work.returned1,
        go_out_2: work.goOut2,
        returned_2: work.returned2,
        go_out_3: work.goOut3,
        returned_3: work.returned3,
      })));
  }
}

export class WorkClockVoidOutput implements IWorkClockVoidOutput {
  public success(): APIGatewayProxyResult {
    return views.success({});
  }
}
