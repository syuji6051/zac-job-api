import {
  WorkListInput as IWorkGetInput,
} from 'app/usecases/inputs/Works';
import { APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';

class WorkInput { }

export class WorkListInput extends WorkInput implements IWorkGetInput {
  private authorizer: APIGatewayEventDefaultAuthorizerContext;
  private body: { [name: string]: string };
  private yearMonth: string;
  public constructor(
    authorizer: APIGatewayEventDefaultAuthorizerContext,
    body: string) {
    super();
    console.log(body);
    this.authorizer = authorizer;
    this.body = JSON.parse(body) as { [name: string]: string };
    this.yearMonth = this.body.yearMonth;
    console.log(this.body);
    console.log(this.yearMonth);
    console.log(authorizer!.claims);
  }

  public getUserId(): string {
    return this.authorizer!.claims['cognito:username'];
  }

  public getYearMonth(): string {
    return this.yearMonth;
  }
}