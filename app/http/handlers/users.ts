import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { container, TYPES } from "../../providers/container";
import { Users as UseCase } from 'app/usecases/Users';
import { UserCreateInput, UserListInput } from "../../adapters/http/request/Users";
import { UserCreateOutput, UserListOutput } from '../../adapters/http/response/Users';

export const create = async (event: APIGatewayEvent, _content: Context, _cb: Callback): Promise<void> => {
  return container.get<UseCase>(TYPES.USECASE_USERS)
    .create(
      new UserCreateInput(event.headers, JSON.parse(event.body!) as any),
      new UserCreateOutput());
};

export const list = async (event: APIGatewayEvent, _content: Context, _cb: Callback): Promise<void> => {
  console.debug(event);
  const { headers, queryStringParameters } = event;
  const query = queryStringParameters || {};
  return container.get<UseCase>(TYPES.USECASE_USERS)
    .list(
      new UserListInput(headers, query),
      new UserListOutput())
};
