import {
  UserCreateInput as IUserCreateInput,
  UserListInput as IUserListInput,
} from 'app/usecases/inputs/Users';

class UserInput {
  protected _getAuthUserId(headers: { [name: string]: string }): string {
    return headers["Authorization"];
  }
}

export class UserCreateInput extends UserInput implements IUserCreateInput {
  private username: string;
  private password: string;

  public constructor(
    _headers: { [name: string]: string },
    eventBody: { [field: string]: any }) {
    super();
    this.username = eventBody.username;
    this.password = eventBody.password;
  }

  public getUserName(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }
}

export class UserListInput extends UserInput implements IUserListInput {
  private paginationToken: string;

  public constructor(
    _headers: { [name: string]: string },
    query: { [field: string]: string }) {
    super();
    console.log(query);
    this.paginationToken = query.paginationToken;
  }

  public getPaginationToken(): string {
    return this.paginationToken;
  }
}