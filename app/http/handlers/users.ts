import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { container, TYPES } from "app/providers/container";
import { Users as UseCase } from 'app/usecases/Users';
import { UserCreateInput, UserListInput } from "app/adapters/http/request/Users";
import { UserCreateOutput, UserListOutput } from 'app/adapters/http/response/Users';


export const create = async (event: APIGatewayEvent, _content: Context, cb: Callback): Promise<void> => {
  return container.get<UseCase>(TYPES.USECASE_USERS)
    .create(
      new UserCreateInput(event.headers, event.body as any),
      new UserCreateOutput(cb));
};

export const list = async (event: APIGatewayEvent, _content: Context, cb: Callback): Promise<void> => {
  return container.get<UseCase>(TYPES.USECASE_USERS)
    .list(
      new UserListInput(event.headers, event.body as any),
      new UserListOutput(cb))
};
