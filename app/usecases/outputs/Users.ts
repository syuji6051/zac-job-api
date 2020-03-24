import { User, Users } from 'app/entities/Users';

export interface UserCreateOutput {
  success(user: User): void;
  error400(error: Error): void;
}

export interface UserListOutput {
  success(users: Users): void;
}