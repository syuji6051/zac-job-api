import { APIGatewayEvent, APIGatewayProxyResult, APIGatewayProxyWithCognitoAuthorizerEvent } from 'aws-lambda';

import { asyncModules, container, TYPES } from '@/providers/container';
import { Users as UseCase } from '@/usecases/Users';
import {
  PutZacLoginInput, UserCreateInput, UserListInput, ZacWorkRegisterInput,
} from '@/adapters/http/request/Users';
import {
  PutZacLoginOutput, UserCreateOutput, UserListOutput, ZacWorkRegisterOutput,
} from '@/adapters/http/response/Users';
import logger from '@/lib/logger';
import { lambdaErrorHandler } from '@/middleware/lambda-error-handler';

export const create = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => container.get<UseCase>(TYPES.USECASE_USERS)
  .create(
    new UserCreateInput(event.headers, JSON.parse(event.body!) as any),
    new UserCreateOutput(),
  );

export const list = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  logger.debug(event);
  const { headers, queryStringParameters } = event;
  const query = queryStringParameters || {};
  return container.get<UseCase>(TYPES.USECASE_USERS)
    .list(
      new UserListInput(headers, query),
      new UserListOutput(),
    );
};

export const putZacLogin = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  const { body, requestContext } = event;
  logger.info(JSON.stringify(event));

  return (async () => {
    await asyncModules;
    return container.get<UseCase>(TYPES.USECASE_USERS)
      .putZacLogin(
        new PutZacLoginInput(requestContext, body),
        new PutZacLoginOutput(),
      );
  })().catch((err) => {
    logger.log(err);
    return lambdaErrorHandler(err);
  });
};

export const postZacRegister = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  const { body, requestContext } = event;
  logger.info(JSON.stringify(event));

  return (async () => {
    await asyncModules;
    return container.get<UseCase>(TYPES.USECASE_USERS)
      .ZacWorkRegister(
        new ZacWorkRegisterInput(requestContext, body),
        new ZacWorkRegisterOutput(),
      );
  })().catch((err) => {
    logger.log(err);
    return lambdaErrorHandler(err);
  });
};
