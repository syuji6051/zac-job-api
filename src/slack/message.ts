import { ChatPostMessageArguments, WebClient } from '@slack/web-api';
import { secrets } from '@syuji6051/zac-job-interface';
import { logger } from '@syuji6051/zac-job-library';

export default class Message {
  slack: WebClient;

  secret: secrets.SecretsValues;

  constructor(secret: secrets.SecretsValues) {
    this.secret = secret;
    this.slack = new WebClient(secret.SLACK_TOKEN);
  }

  async sendMessage(options: ChatPostMessageArguments) {
    const res = await this.slack.chat.postMessage(options);
    if (!res.ok) throw new Error('Slack response not ok');
    logger.debug(`slack postMessage success: response ${JSON.stringify(res)}`);
    return res;
  }
}
