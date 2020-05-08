import {
  WorkListInput as IWorkGetInput,
} from 'app/usecases/inputs/Works';
import { APIGatewayEventIdentity } from 'aws-lambda';

class WorkInput { }

export class WorkListInput extends WorkInput implements IWorkGetInput {
  private identity: APIGatewayEventIdentity;
  private yearMonth: string;
  public constructor(
    identity: APIGatewayEventIdentity,
    query: { [name: string]: string }) {
    super();
    this.identity = identity;
    this.yearMonth = query.yearMonth;
  }

  public getUserId(): string {
    return this.identity.user!;
  }

  public getYearMonth(): string {
    return this.yearMonth;
  }
}