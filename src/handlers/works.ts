import {
  APIGatewayProxyEventV2, APIGatewayProxyResult, Handler,
} from 'aws-lambda';
import { logger, services } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Works as UseCase } from '@/src/usecases/works';
import {
  PunchWorkInput, GetWorkListInput, SyncObcWorksInput,
} from '@/src/adapters/http/request/works';
import {
  GetWorkListOutput, WorkClockVoidOutput,
} from '@/src/adapters/http/response/works';
import { seriesLoadAsync } from '@/src/helper/container';
import { asyncAsmContainerModule } from '@/src/modules/common';

const loadAsyncModules = seriesLoadAsync([
  asyncAsmContainerModule,
]);

export const workSync: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  await loadAsyncModules;
  logger.info(JSON.stringify(event));

  const res = await new services.WebApplication(
    'SyncWorkList',
    container.get<UseCase>(TYPES.USECASE_WORKS).workSync(
      new SyncObcWorksInput(event), new WorkClockVoidOutput(),
    ),
  ).run(event);
  return res;
};

export const workList: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  await loadAsyncModules;
  logger.info(JSON.stringify(event));

  const res = await new services.WebApplication(
    'GetWorkList',
    container.get<UseCase>(TYPES.USECASE_WORKS).getWorkList(
      new GetWorkListInput(event), new GetWorkListOutput(),
    ),
  ).run(event);
  return res;
};

export const punchWork: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  await loadAsyncModules;
  const res = await new services.WebApplication(
    'punchWork',
    container.get<UseCase>(TYPES.USECASE_WORKS).punchWork(
      new PunchWorkInput(event), new WorkClockVoidOutput(),
    ),
  ).run(event);
  return res;
};
