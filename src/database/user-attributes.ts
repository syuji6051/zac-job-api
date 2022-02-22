import mapper from '@/src/database/dynamo-mapper';
import { UserAttributesRecord } from '@/src/entities/dynamodb/user-attributes';
import { logger } from '@syuji6051/zac-job-library';

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

  public async get(userId: string) {
    try {
      // eslint-disable-next-line new-parens
      return mapper.get(Object.assign(new UserAttributesRecord, { userId }));
    } catch (err) {
      if (err instanceof Error) {
        logger.debug(err.stack);
      }
      throw err;
    }
  }
}
