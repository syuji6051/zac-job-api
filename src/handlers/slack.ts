import {
  APIGatewayProxyEventV2, APIGatewayProxyResult, Handler,
} from 'aws-lambda';
import { logger, middleware } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { seriesLoadAsync } from '@/src/helper/container';
import { asyncAsmContainerModule } from '@/src/modules/common';
import { Slack as UseCase } from '@/src/usecases/slack';
import { SetUserAttributeInput, ActionEventsInput } from '@/src/adapters/http/request/slack';
import { SetUserAttributeOutput, ActionEventOutput } from '@/src/adapters/http/response/slack';

const loadAsyncModules = seriesLoadAsync([
  asyncAsmContainerModule,
]);

// eslint-disable-next-line import/prefer-default-export
export const setUserAttribute: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => loadAsyncModules.then(() => {
  logger.info(JSON.stringify(event));
  const { requestContext: { authorizer }, body } = event;

  return (async () => container.get<UseCase>(TYPES.USECASE_SLACK).setUserAttributes(
    new SetUserAttributeInput(authorizer, body),
    new SetUserAttributeOutput(),
  ))()
    .catch((err) => middleware.lambdaErrorHandler(err))
    .finally(() => {
      logger.info('workSync function end');
    });
});

// eslint-disable-next-line import/prefer-default-export
export const actionEvents: Handler = async (
  event: APIGatewayProxyResult,
): Promise<APIGatewayProxyResult> => loadAsyncModules.then(() => {
  logger.info(JSON.stringify(event));
  const { body } = event;

  return (async () => container.get<UseCase>(TYPES.USECASE_SLACK).actionEvents(
    new ActionEventsInput(body),
    new ActionEventOutput(),
  ))()
    .catch((err) => middleware.lambdaErrorHandler(err))
    .finally(() => {
      logger.info('workSync function end');
    });
});
