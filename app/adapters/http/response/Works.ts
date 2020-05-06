import { APIGatewayProxyResult } from "aws-lambda";
import {
  WorkListOutput as IWorkListOutput,
} from '../../../usecases/outputs/Works';
import {
  Work as WorkEntity,
} from 'app/entities/Works';
import { success } from "app/http/views/response";

export class WorkListOutput implements IWorkListOutput {
  public success(works: WorkEntity[]): APIGatewayProxyResult {
    return success(works);
  }
}