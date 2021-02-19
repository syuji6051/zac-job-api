import {
  APIGatewayEvent, APIGatewayProxyResult,
} from 'aws-lambda';
import { container, TYPES } from '@/src/providers/container';
import { Works as UseCase } from '@/src/usecases/Works';
import {
  WorkListInput, WorkClockInInput, WorkClockOutInput, WorkGoOutInput, WorkGoReturnInput,
} from '@/src/adapters/http/request/Works';
import {
  WorkListOutput, WorkClockInOutput, WorkClockOutOutput, WorkGoOutOutput, WorkGoReturnOutput,
} from '@/src/adapters/http/response/Works';
import logger from '@/src/lib/logger';

export const workSync = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .workSync(
      new WorkListInput(authorizer, body!),
      new WorkListOutput(),
    );
};

export const clockIn = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .clockIn(
      new WorkClockInInput(authorizer, body!),
      new WorkClockInOutput(),
    );
};

export const clockOut = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .clockOut(
      new WorkClockOutInput(authorizer, body!),
      new WorkClockOutOutput(),
    );
};

export const goOut = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .goOut(
      new WorkGoOutInput(authorizer, body!),
      new WorkGoOutOutput(),
    );
};

export const goReturn = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  logger.info(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .goReturn(
      new WorkGoReturnInput(authorizer, body!),
      new WorkGoReturnOutput(),
    );
};
