import { views } from '@syuji6051/zac-job-library';
import { GetWorkCodeListOutput as IGetWorkCodeListOutput, VoidOutput as IVoidOutput } from '@/src/usecases/outputs/zac';
import { APIGatewayProxyResult } from 'aws-lambda';
import { WorkCode } from '@/src/entities/zac';

/* eslint-disable import/prefer-default-export */
export class GetWorkCodeListOutput implements IGetWorkCodeListOutput {
  public success(workCodeList: WorkCode[]): APIGatewayProxyResult {
    return views.success(workCodeList);
  }
}

/* eslint-disable import/prefer-default-export */
export class VoidOutput implements IVoidOutput {
  public success(): APIGatewayProxyResult {
    return views.success();
  }
}
