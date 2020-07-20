import { APIGatewayEvent, Context, APIGatewayProxyResult, Callback } from "aws-lambda";
import { container, TYPES } from "../../providers/container";
import { Works as UseCase } from 'app/usecases/Works';
import { WorkListInput, WorkClockInInput, WorkClockOutInput, WorkGoOutInput, WorkGoReturnInput } from "../../adapters/http/request/Works";
import { WorkListOutput, WorkClockInOutput, WorkClockOutOutput, WorkGoOutOutput, WorkGoReturnOutput } from "../../adapters/http/response/Works";

export const workSync = async (event: APIGatewayEvent, _content: Context, _cb: Callback): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .workSync(
      new WorkListInput(authorizer, body!),
      new WorkListOutput(),
    );
};

export const clockIn = async (event: APIGatewayEvent, _content: Context, _cb: Callback): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .clockIn(
      new WorkClockInInput(authorizer, body!),
      new WorkClockInOutput(),
    );
};

export const clockOut = async (event: APIGatewayEvent, _content: Context, _cb: Callback): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .clockOut(
      new WorkClockOutInput(authorizer, body!),
      new WorkClockOutOutput(),
    );
};

export const goOut = async (event: APIGatewayEvent, _content: Context, _cb: Callback): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .goOut(
      new WorkGoOutInput(authorizer, body!),
      new WorkGoOutOutput(),
    );
};

export const goReturn = async (event: APIGatewayEvent, _content: Context, _cb: Callback): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { requestContext: { authorizer }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .goReturn(
      new WorkGoReturnInput(authorizer, body!),
      new WorkGoReturnOutput(),
    );
};