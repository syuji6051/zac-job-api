import {
  APIGatewayProxyResult, APIGatewayProxyWithCognitoAuthorizerEvent, Handler,
} from 'aws-lambda';
import { logger } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Works as UseCase } from '@/src/usecases/works';
import {
  WorkInput,
  WorkListInput,
} from '@/src/adapters/http/request/works';
import {
  WorkListOutput, WorkClockVoidOutput,
} from '@/src/adapters/http/response/works';

export const workSync: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  logger.info(JSON.stringify(event));
  const { requestContext: { authorizer }, queryStringParameters } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .workSync(
      new WorkListInput(authorizer, queryStringParameters),
      new WorkClockVoidOutput(),
    );
};

export const workList: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  logger.info(JSON.stringify(event));
  const { requestContext: { authorizer }, queryStringParameters } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .workList(
      new WorkListInput(authorizer, queryStringParameters),
      new WorkListOutput(),
    );
};

export const clockIn: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer } } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .clockIn(
      new WorkInput(authorizer),
      new WorkClockVoidOutput(),
    );
};

export const clockOut: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer } } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .clockOut(
      new WorkInput(authorizer),
      new WorkClockVoidOutput(),
    );
};

export const goOut: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer } } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .goOut(
      new WorkInput(authorizer),
      new WorkClockVoidOutput(),
    );
};

export const goReturn: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer } } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .goReturn(
      new WorkInput(authorizer),
      new WorkClockVoidOutput(),
    );
};
