import { User, Users as EntitiesUsers, UserInfo } from "../../entities/Users";

export interface Users {
  create(email: string, password: string): Promise<User>;
  get(userId: string): Promise<UserInfo>;
  list(paramPaginationToken: string): Promise<EntitiesUsers>
};
