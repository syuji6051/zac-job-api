import { APIGatewayProxyResult } from 'aws-lambda';
import {
  WorkListOutput as IWorkListOutput,
  WorkClockInOutput as IWorkClockInOutput,
  WorkClockOutOutput as IWorkClockOutOutput,
  WorkGoOutOutput as IWorkGoOutOutput,
  WorkGoReturnOutput as IWorkGoReturnOutput,

} from '@/usecases/outputs/Works';
import { success } from '@/views/response';

export class WorkListOutput implements IWorkListOutput {
  public success(): APIGatewayProxyResult {
    return success({});
  }
}

export class WorkClockInOutput implements IWorkClockInOutput {
  public success(): APIGatewayProxyResult {
    return success({});
  }
}

export class WorkClockOutOutput implements IWorkClockOutOutput {
  public success(): APIGatewayProxyResult {
    return success({});
  }
}

export class WorkGoOutOutput implements IWorkGoOutOutput {
  public success(): APIGatewayProxyResult {
    return success({});
  }
}

export class WorkGoReturnOutput implements IWorkGoReturnOutput {
  public success(): APIGatewayProxyResult {
    return success({});
  }
}
