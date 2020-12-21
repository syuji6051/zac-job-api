import { 
  WorkListInput,
  WorkClockInInput,
  WorkClockOutInput,
  WorkGoOutInput,
  WorkGoReturnInput
} from "appadapters/http/request/Works";
import {
  WorkListOutput,
  WorkClockInOutput,
  WorkClockOutOutput,
  WorkGoOutOutput,
  WorkGoReturnOutput
} from "appadapters/http/response/Works";
import { APIGatewayProxyResult } from "aws-lambda";

export interface Works {
  workSync(input: WorkListInput, output: WorkListOutput): Promise<APIGatewayProxyResult>;
  clockIn(input: WorkClockInInput, output: WorkClockInOutput): Promise<APIGatewayProxyResult>;
  clockOut(input: WorkClockOutInput, output: WorkClockOutOutput): Promise<APIGatewayProxyResult>;
  goOut(input: WorkGoOutInput, output: WorkGoOutOutput): Promise<APIGatewayProxyResult>;
  goReturn(input: WorkGoReturnInput, output: WorkGoReturnOutput): Promise<APIGatewayProxyResult>;
}