import { ChatPostMessageArguments, WebClient } from '@slack/web-api';
import { SecretsValues } from '@/src/entities/environments';
import { logger } from '@syuji6051/zac-job-library';

export default class Message {
  slack: WebClient;

  secrets: SecretsValues;

  constructor(secrets: SecretsValues) {
    this.secrets = secrets;
    this.slack = new WebClient(secrets.SLACK_TOKEN);
  }

  async sendMessage(options: ChatPostMessageArguments) {
    const res = await this.slack.chat.postMessage(options);
    if (!res.ok) throw new Error('Slack response not ok');
    logger.debug(`slack postMessage success: response ${JSON.stringify(res)}`);
    return res;
  }
}
