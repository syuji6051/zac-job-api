import { WorkListInput } from "appadapters/http/request/Works";
import { WorkListOutput } from "appadapters/http/response/Works";
import { APIGatewayProxyResult } from "aws-lambda";

export interface Works {
  workSync(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
}