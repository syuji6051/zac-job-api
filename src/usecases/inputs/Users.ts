export interface UserCreateInput {
  getUserName(): string;
  getPassword(): string;
}

export interface UserListInput {
  getPaginationToken(): string;
}

export interface PutZacLoginInput {
  getUserName(): string;
  getZacUserId(): string;
  getZacPassword(): string;
}
