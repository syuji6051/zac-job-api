/* eslint-disable no-unused-vars */
import { GetWorkCodeListInput, RegisterWorksInput, SetWorkCodeListInput } from '@/src/usecases/inputs/zac';
import { APIGatewayProxyResult } from 'aws-lambda';
import { WorkClockVoidOutput } from '@/src/usecases/outputs/works';
import { GetWorkCodeListOutput, VoidOutput } from '@/src/usecases/outputs/zac';

export interface Zac {
  linkAutoZacWorks(
    input: RegisterWorksInput, output: WorkClockVoidOutput
  ): Promise<APIGatewayProxyResult>;

  getWorkCodeList(
    input: GetWorkCodeListInput, output: GetWorkCodeListOutput
  ): Promise<APIGatewayProxyResult>;

  setWorkCodeList(
    input: SetWorkCodeListInput, output: VoidOutput
  ): Promise<APIGatewayProxyResult>;
}
