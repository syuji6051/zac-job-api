/* eslint-disable no-unused-vars */
import { APIGatewayProxyResult } from 'aws-lambda';
import { WorkRecord } from '@/src/entities/dynamodb/works';

export interface WorkListOutput {
  success(works: WorkRecord[]): APIGatewayProxyResult;
}

export interface WorkClockVoidOutput {
  success(): APIGatewayProxyResult;
}
