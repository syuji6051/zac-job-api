import { APIGatewayProxyCognitoAuthorizer, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
import { validation, errors } from '@syuji6051/zac-job-library';
import camelcaseKeys from 'camelcase-keys';

import {
  WorkListInput as IWorkListInput,
} from '@/src/usecases/inputs/works';
import { workSyncRequestFunc } from '@/src/validations/works';
import { WorkSyncRequest } from '@/src/entities/works';

export class WorkInput {
  protected authorizer: APIGatewayProxyCognitoAuthorizer;

  public constructor(
    authorizer: APIGatewayProxyCognitoAuthorizer,
  ) {
    this.authorizer = authorizer;
  }

  public getUserId(): string {
    const { claims } = this.authorizer;
    return claims['cognito:username'] || claims.username;
  }
}

export class WorkListInput extends WorkInput implements IWorkListInput {
  private workSyncRequest: WorkSyncRequest;

  public constructor(
    authorizer: APIGatewayProxyCognitoAuthorizer,
    query: APIGatewayProxyEventQueryStringParameters | null = {},
  ) {
    super(authorizer);
    try {
      validation.check(workSyncRequestFunc, query);
    } catch (err) {
      throw new errors.ValidationError(err.message);
    }
    this.workSyncRequest = camelcaseKeys(query!) as unknown as WorkSyncRequest;
  }

  public getYearMonth(): string {
    return this.workSyncRequest.yearMonth;
  }
}
