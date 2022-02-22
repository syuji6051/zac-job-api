import {
  APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyResult, Handler,
} from 'aws-lambda';
import { logger, middleware } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Users as UseCase } from '@/src/usecases/users';
import {
  PutZacInfoInput, PutObcInfoInput, UserCreateInput, UserListInput, GetUserInfoInput,
} from '@/src/adapters/http/request/users';
import {
  PutZacInfoOutput, PutObcInfoOutput, UserCreateOutput, UserListOutput, GetUserInfoOutput,
} from '@/src/adapters/http/response/users';
import { seriesLoadAsync } from '@/src/helper/container';
import { asyncAsmContainerModule } from '@/src/modules/common';

const loadAsyncModules = seriesLoadAsync([
  asyncAsmContainerModule,
]);

export const create: Handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => loadAsyncModules.then(() => {
  logger.info(JSON.stringify(event));

  return (async () => container.get<UseCase>(TYPES.USECASE_USERS).create(
    new UserCreateInput(event.headers, JSON.parse(event.body!) as any),
    new UserCreateOutput(),
  ))()
    .catch((err) => middleware.lambdaErrorHandler(err))
    .finally(() => {
      logger.info('workSync function end');
    });
});
// ): Promise<APIGatewayProxyResult> => container.get<UseCase>(TYPES.USECASE_USERS)
//   .create(
//     new UserCreateInput(event.headers, JSON.parse(event.body!) as any),
//     new UserCreateOutput(),
//   );

export const list: Handler = async (
  event: APIGatewayProxyEvent,
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

export const getUserInfo: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => loadAsyncModules.then(async () => {
  logger.info(JSON.stringify(event));
  const { requestContext } = event;

  return (async () => container.get<UseCase>(TYPES.USECASE_USERS).getUserInfo(
    new GetUserInfoInput(requestContext.authorizer),
    new GetUserInfoOutput(),
  ))()
    .catch((err) => middleware.lambdaErrorHandler(err))
    .finally(() => {
      logger.info('workSync function end');
    });
});

export const putZacInfo: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => loadAsyncModules.then(async () => {
  logger.info(JSON.stringify(event));
  const { body, requestContext } = event;

  return (async () => container.get<UseCase>(TYPES.USECASE_USERS).putZacInfo(
    new PutZacInfoInput(requestContext.authorizer, body),
    new PutZacInfoOutput(),
  ))()
    .catch((err) => middleware.lambdaErrorHandler(err))
    .finally(() => {
      logger.info('workSync function end');
    });
});

export const putObcInfo: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => loadAsyncModules.then(() => {
  logger.info(JSON.stringify(event));
  const { body, requestContext } = event;

  return (async () => container.get<UseCase>(TYPES.USECASE_USERS).putObcInfo(
    new PutObcInfoInput(requestContext.authorizer, body),
    new PutObcInfoOutput(),
  ))()
    .catch((err) => middleware.lambdaErrorHandler(err))
    .finally(() => {
      logger.info('workSync function end');
    });
});
