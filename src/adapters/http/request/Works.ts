import {
  WorkListInput as IWorkListInput,
  WorkClockInInput as IWorkClockInInput,
  WorkClockOutInput as IWorkClockOutInput,
  WorkGoOutInput as IWorkGoOutInput,
  WorkGoReturnInput as IWorkGoReturnInput,
} from '@/src/usecases/inputs/Works';
import { APIGatewayEventDefaultAuthorizerContext } from 'aws-lambda';

class WorkInput {
  protected authorizer: APIGatewayEventDefaultAuthorizerContext;

  protected body: { [name: string]: string };

  public constructor(
    authorizer: APIGatewayEventDefaultAuthorizerContext,
    body: string,
  ) {
    this.authorizer = authorizer;
    this.body = JSON.parse(body) as { [name: string]: string };
  }

  public getUserId(): string {
    const { claims } = this.authorizer!;
    return claims['cognito:username'] || claims.username;
  }
}

export class WorkListInput extends WorkInput implements IWorkListInput {
  private yearMonth: string;

  public constructor(
    authorizer: APIGatewayEventDefaultAuthorizerContext,
    body: string,
  ) {
    super(authorizer, body);
    this.yearMonth = this.body.yearMonth;
  }

  public getYearMonth(): string {
    return this.yearMonth;
  }
}

export class WorkClockInInput extends WorkInput implements IWorkClockInInput {
  public constructor(
    authorizer: APIGatewayEventDefaultAuthorizerContext,
    body: string,
  ) {
    super(authorizer, body);
    this.authorizer = authorizer;
  }
}

export class WorkClockOutInput extends WorkInput implements IWorkClockOutInput {
  public constructor(
    authorizer: APIGatewayEventDefaultAuthorizerContext,
    body: string,
  ) {
    super(authorizer, body);
    this.authorizer = authorizer;
  }
}

export class WorkGoOutInput extends WorkInput implements IWorkGoOutInput {
  public constructor(
    authorizer: APIGatewayEventDefaultAuthorizerContext,
    body: string,
  ) {
    super(authorizer, body);
    this.authorizer = authorizer;
  }
}

export class WorkGoReturnInput extends WorkInput implements IWorkGoReturnInput {
  public constructor(
    authorizer: APIGatewayEventDefaultAuthorizerContext,
    body: string,
  ) {
    super(authorizer, body);
    this.authorizer = authorizer;
  }
}
