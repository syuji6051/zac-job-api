import DynamoDB from "aws-sdk/clients/dynamodb";
import {
  attribute,
  table,
  hashKey
} from "@aws/dynamodb-data-mapper-annotations";
import { DataMapper } from "@aws/dynamodb-data-mapper";

console.log(process.env.DYNAMO_ENDPOINT);
const mapper = new DataMapper({
  client: new DynamoDB({
    endpoint: process.env.DYNAMO_ENDPOINT,
    region: process.env.AWS_DEFAULT_REGION
  }),
});

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