import { WorkListInput } from "appadapters/http/request/Works";
import { WorkListOutput } from "appadapters/http/response/Works";
import { APIGatewayProxyResult } from "aws-lambda";

export interface Works {
  workSync(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
  clockIn(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
  clockOut(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
  goOut(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
  goReturn(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
}