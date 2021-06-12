/* eslint-disable no-unused-vars */
import {
  WorkListOutput,
  WorkClockVoidOutput,
} from '@/src/adapters/http/response/works';
import { APIGatewayProxyResult } from 'aws-lambda';
import { WorkListInput, WorkInput } from '@/src/usecases/inputs/works';

export interface Works {
  workSync(input: WorkListInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
  workList(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
  clockIn(input: WorkInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
  clockOut(input: WorkInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
  goOut(input: WorkInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
  goReturn(input: WorkInput, output: WorkClockVoidOutput): Promise<APIGatewayProxyResult>;
}
