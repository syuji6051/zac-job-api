import { User, Users } from 'app/entities/Users';

export interface UserCreateOutput {
  success(user: User): void;
}

export interface UserListOutput {
  success(users: Users): void;
}