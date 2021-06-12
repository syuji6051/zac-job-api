import {
  APIGatewayProxyEventV2, APIGatewayProxyResult, Handler,
} from 'aws-lambda';
import { logger, middleware } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Works as UseCase } from '@/src/usecases/works';
import {
  WorkInput,
  WorkListInput,
} from '@/src/adapters/http/request/works';
import {
  WorkListOutput, WorkClockVoidOutput,
} from '@/src/adapters/http/response/works';
import { seriesLoadAsync } from '@/src/helper/container';
import { asyncAsmContainerModule } from '@/src/modules/common';

const loadAsyncModules = seriesLoadAsync([
  asyncAsmContainerModule,
]);

export const workSync: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => loadAsyncModules.then(() => {
  logger.info(JSON.stringify(event));
  const { requestContext: { authorizer }, queryStringParameters } = event;

  return (async () => container.get<UseCase>(TYPES.USECASE_WORKS).workSync(
    new WorkListInput(authorizer, queryStringParameters),
    new WorkClockVoidOutput(),
  ))()
    .catch((err) => middleware.lambdaErrorHandler(err))
    .finally(() => {
      logger.info('workSync function end');
    });
});

export const workList: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => loadAsyncModules.then(() => {
  logger.info(JSON.stringify(event));
  const { requestContext: { authorizer }, queryStringParameters } = event;

  return (async () => container.get<UseCase>(TYPES.USECASE_WORKS).workList(
    new WorkListInput(authorizer, queryStringParameters),
    new WorkListOutput(),
  ))()
    .catch((err) => middleware.lambdaErrorHandler(err))
    .finally(() => {
      logger.info('workSync function end');
    });
});

//   logger.info(JSON.stringify(event));
//   const { requestContext: { authorizer }, queryStringParameters } = event;
//   return container.get<UseCase>(TYPES.USECASE_WORKS)
//     .workList(
//       new WorkListInput(authorizer, queryStringParameters),
//       new WorkListOutput(),
//     ).;

//   return (async () => container.get<UseCase>(TYPES.USECASE_DEVICE)
//     .linkageHistory()
//   )()
//     .finally(() => {
//       logger.info('device linkage history function end');
//     });
// }));

export const clockIn: Handler = async (
  event: APIGatewayProxyEventV2,
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
  event: APIGatewayProxyEventV2,
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
  event: APIGatewayProxyEventV2,
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
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer } } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .goReturn(
      new WorkInput(authorizer),
      new WorkClockVoidOutput(),
    );
};
