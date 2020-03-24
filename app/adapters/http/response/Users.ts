import { Callback } from "aws-lambda";
import {
  UserCreateOutput as IUserCreateOutput,
  UserListOutput as IUserListOutput,
} from '../../../usecases/outputs/Users';
import { User as UserEntity, Users as UsersEntity } from 'app/entities/Users';
import { success, invalidError } from '../../../http/views/response';

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

  public error400(error: Error) {
    invalidError(this.cb, error);
  }
}

export class UserListOutput extends UserOutput implements IUserListOutput {
  public success(users: UsersEntity): void {
    success(this.cb, JSON.stringify(users));
  }
}