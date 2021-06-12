import {
  APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyWithCognitoAuthorizerEvent, Handler,
} from 'aws-lambda';
import { logger, middleware } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Users as UseCase } from '@/src/usecases/users';
import {
  PutZacLoginInput, PutObcLoginInput, UserCreateInput, UserListInput, ZacWorkRegisterInput,
} from '@/src/adapters/http/request/users';
import {
  PutZacLoginOutput, PutObcLoginOutput, UserCreateOutput, UserListOutput, ZacWorkRegisterOutput,
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

export const putZacLogin: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  const { body, requestContext } = event;
  logger.info(JSON.stringify(event));

  return container.get<UseCase>(TYPES.USECASE_USERS)
    .putZacLogin(
      new PutZacLoginInput(body, requestContext.authorizer),
      new PutZacLoginOutput(),
    );
};

export const putObcLogin: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  const { body, requestContext } = event;
  logger.info(JSON.stringify(event));

  return container.get<UseCase>(TYPES.USECASE_USERS)
    .putObcLogin(
      new PutObcLoginInput(body, requestContext.authorizer),
      new PutObcLoginOutput(),
    );
};

export const postZacRegister: Handler = async (
  event: APIGatewayProxyWithCognitoAuthorizerEvent,
): Promise<APIGatewayProxyResult> => {
  const { body, requestContext } = event;
  logger.info(JSON.stringify(event));

  return container.get<UseCase>(TYPES.USECASE_USERS)
    .ZacWorkRegister(
      new ZacWorkRegisterInput(body, requestContext.authorizer),
      new ZacWorkRegisterOutput(),
    );
};
