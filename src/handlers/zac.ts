import {
  APIGatewayProxyEventV2, APIGatewayProxyResult, Handler,
} from 'aws-lambda';
import { logger, services } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Zac as UseCase } from '@/src/usecases/zac';
import { GetWorkCodeListInput, RegisterWorkInput, SetWorkCodeListInput } from '@/src/adapters/http/request/zac';
import { WorkClockVoidOutput } from '@/src/adapters/http/response/works';
import { GetWorkCodeListOutput, VoidOutput } from '@/src/adapters/http/response/zac';
import { asyncAsmContainerModule } from '@/src/modules/common';
import { seriesLoadAsync } from '@/src/helper/container';

const loadAsyncModules = seriesLoadAsync([
  asyncAsmContainerModule,
]);

export const linkAutoZacWorks: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  await loadAsyncModules;
  const res = await new services.WebApplication(
    'linkAutoZacWorks',
    container.get<UseCase>(TYPES.USECASE_ZAC).linkAutoZacWorks(
      new RegisterWorkInput(event), new WorkClockVoidOutput(),
    ),
  ).run(event);
  return res;
};

export const getWorkCodeList: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  await loadAsyncModules;
  logger.info(JSON.stringify(event));

  const res = await new services.WebApplication(
    'getWorkCodeList',
    container.get<UseCase>(TYPES.USECASE_ZAC).getWorkCodeList(
      new GetWorkCodeListInput(event),
      new GetWorkCodeListOutput(),
    ),
  ).run(event);
  return res;
};

export const setWorkCodeList: Handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResult> => {
  await loadAsyncModules;
  logger.info(JSON.stringify(event));

  return new services.WebApplication(
    'setWorkCodeList',
    container.get<UseCase>(TYPES.USECASE_ZAC).setWorkCodeList(
      new SetWorkCodeListInput(event),
      new VoidOutput(),
    ),
  ).run(event);
};
