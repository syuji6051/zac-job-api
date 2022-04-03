import mapper from '@/src/database/dynamo-mapper';
import { UserSlackChannelRecord } from '@/src/entities/dynamodb/user-slack-channel';
import { logger } from '@syuji6051/zac-job-library';

export default class UserSlackChannels {
  public async get(userId: string) {
    try {
      // eslint-disable-next-line new-parens
      return mapper.get(Object.assign(new UserSlackChannelRecord, { userId }));
    } catch (err) {
      if (err instanceof Error) {
        logger.debug(err.stack);
      }
      throw err;
    }
  }
}
