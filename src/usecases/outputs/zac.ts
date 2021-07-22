/* eslint-disable no-unused-vars */
import { APIGatewayProxyResult } from 'aws-lambda';
import { WorkCode } from '@/src/entities/zac';

export interface GetWorkCodeListOutput {
  success(works: WorkCode[]): APIGatewayProxyResult;
}

export interface VoidOutput {
  success(): APIGatewayProxyResult;
}
