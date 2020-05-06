import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { container, TYPES } from "../../providers/container";
import { Works as UseCase } from 'app/usecases/Works';
import { WorkListInput } from "app/adapters/http/request/Works";
import { WorkListOutput } from "app/adapters/http/response/Works";

export const list = async (event: APIGatewayEvent, _content: Context): Promise<APIGatewayProxyResult> => {
  const { requestContext: { identity }, body } = event;
  return container.get<UseCase>(TYPES.USECASE_WORKS)
    .list(
      new WorkListInput(identity, JSON.parse(body!)),
      new WorkListOutput(),
    );
};
