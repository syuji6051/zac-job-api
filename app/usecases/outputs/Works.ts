import { Work } from '../../entities/Works';
import { APIGatewayProxyResult } from 'aws-lambda';

export interface WorkListOutput {
  success(works: Work[]): APIGatewayProxyResult;
}

export interface WorkClockInOutput {
  success(): APIGatewayProxyResult;
}

export interface WorkClockOutOutput {
  success(): APIGatewayProxyResult;
}

export interface WorkGoOutOutput {
  success(): APIGatewayProxyResult;
}

export interface WorkGoReturnOutput {
  success(): APIGatewayProxyResult;
}
