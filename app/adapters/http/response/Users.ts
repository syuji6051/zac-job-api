import { Callback } from "aws-lambda";
import {
  UserCreateOutput as IUserCreateOutput,
  UserListOutput as IUserListOutput,
} from 'app/usecases/outputs/Users';
import { User as UserEntity, Users as UsersEntity } from 'app/entities/Users';
import { success } from 'app/http/views/response';

abstract class UserOutput {
  protected cb: Callback;

  public constructor(cb: Callback) {
    this.cb = cb;
  }
};

export class UserCreateOutput extends UserOutput implements IUserCreateOutput {
  public success(user: UserEntity): void {
    success(this.cb, JSON.stringify(user));
  }
}

export class UserListOutput extends UserOutput implements IUserListOutput {
  public success(users: UsersEntity): void {
    success(this.cb, JSON.stringify(users));
  }
}