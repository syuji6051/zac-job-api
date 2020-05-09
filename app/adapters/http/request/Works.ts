import {
  WorkListInput as IWorkGetInput,
} from 'app/usecases/inputs/Works';
import { APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';

class WorkInput { }

export class WorkListInput extends WorkInput implements IWorkGetInput {
  private authorizer: APIGatewayEventDefaultAuthorizerContext;
  private yearMonth: string;
  public constructor(
    authorizer: APIGatewayEventDefaultAuthorizerContext,
    query: { [name: string]: string }) {
    super();
    this.authorizer = authorizer;
    this.yearMonth = query.yearMonth;
    console.log(authorizer!.claims);
    console.log(query);
  }

  public getUserId(): string {
    return this.authorizer!.claims['cognito:username'];
  }

  public getYearMonth(): string {
    return this.yearMonth;
  }
}