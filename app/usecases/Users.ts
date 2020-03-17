import { UserCreateInput, UserListInput } from './inputs/Users';
import { UserCreateOutput, UserListOutput } from './outputs/Users';

export interface Users {
  create(input: UserCreateInput, output: UserCreateOutput): Promise<void>;
  list(input: UserListInput, output: UserListOutput): Promise<void>;
};