import { APIGatewayProxyResult } from "aws-lambda";
import {
  WorkListOutput as IWorkListOutput,
} from '../../../usecases/outputs/Works';
import { success } from "../../../http/views/response";

export class WorkListOutput implements IWorkListOutput {
  public success(): APIGatewayProxyResult {
    return success({});
  }
}