/* eslint-disable no-unused-vars */
import { GetWorkListOutput, WorkClockVoidOutput } from '@/src/adapters/http/response/works';
import { APIGatewayProxyResult } from 'aws-lambda';
import { SyncObcWorksInput, GetWorkListInput, PunchWorkInput } from '@/src/usecases/inputs/works';

export interface Works {
  workSync(input: SyncObcWorksInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
  getWorkList(input: GetWorkListInput, output: GetWorkListOutput): Promise<APIGatewayProxyResult>;
  punchWork(input: PunchWorkInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
}
