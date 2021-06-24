/* eslint-disable no-unused-vars */
import { RegisterWorksInput } from '@/src/usecases/inputs/zac';
import { APIGatewayProxyResult } from 'aws-lambda';
import { WorkClockVoidOutput } from '@/src/usecases/outputs/works';

export interface Zac {
  registerWorks(
    input: RegisterWorksInput, output: WorkClockVoidOutput
  ): Promise<APIGatewayProxyResult>;
}
