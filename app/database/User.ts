import {
  attribute,
  table,
  hashKey
} from "@aws/dynamodb-data-mapper-annotations";
import mapper from './dynamo-mapper';

@table('UserInfo')
export class UserInfoRecord {
  @hashKey()
  userId: string;

  @attribute()
  obcUserId?: string;

  @attribute()
  obcPassword?: string;
};

export class UserInfo {
  public async get(userId: string) {
    const userInfo = await mapper.get(
      Object.assign(new UserInfoRecord(), { userId })
    );
    console.log(userInfo);
    return userInfo;
  }
}