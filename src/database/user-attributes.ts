import mapper from '@/src/database/dynamo-mapper';
import { UserAttributesRecord } from '@/src/entities/dynamodb/user-attributes';

export default class UserAttributes {
  public async set(user: UserAttributesRecord) {
    const toSave = Object.assign(new UserAttributesRecord(), user);
    await mapper.put(toSave);
  }

  public async scan() {
    const records: UserAttributesRecord[] = [];
    for await (const item of mapper.scan(UserAttributesRecord)) {
      records.push(item);
    }
    return records;
  }
}
