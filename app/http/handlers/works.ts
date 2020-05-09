import { APIGatewayEvent, Context, APIGatewayProxyResult, Callback } from "aws-lambda";
import { container, TYPES } from "../../providers/container";
import { Works as UseCase } from 'app/usecases/Works';
import { WorkListInput } from "../../adapters/http/request/Works";
import { WorkListOutput } from "../../adapters/http/response/Works";

export const workList = async (event: APIGatewayEvent, _content: Context, _cb: Callback): Promise<APIGatewayProxyResult> => {
  console.log(event);
  const { requestContext: { authorizer }, queryStringParameters } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .list(
      new WorkListInput(authorizer, queryStringParameters!),
      new WorkListOutput(),
    );
};
