import { Work } from '../../entities/Works';
import { APIGatewayProxyResult } from 'aws-lambda';

export interface WorkListOutput {
  success(works: Work[]): APIGatewayProxyResult;
}