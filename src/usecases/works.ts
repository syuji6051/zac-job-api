/* eslint-disable no-unused-vars */
import {
  WorkListOutput,
  WorkClockVoidOutput,
} from '@/src/adapters/http/response/works';
import { APIGatewayProxyResult } from 'aws-lambda';
import { WorkListInput, PunchWorkInput } from '@/src/usecases/inputs/works';

export interface Works {
  workSync(input: WorkListInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
  workList(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
  punchWork(input: PunchWorkInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
}
