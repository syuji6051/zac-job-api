import { WebClient } from '@slack/web-api';
import { SecretsValues } from '@/src/entities/environments';
import { logger } from '@syuji6051/zac-job-library';

export default class UserInfo {
  slack: WebClient;

  secrets: SecretsValues;

  constructor(secrets: SecretsValues) {
    this.secrets = secrets;
    this.slack = new WebClient(secrets.SLACK_TOKEN);
  }

  async getAccessToken(code: string) {
    const res = await this.slack.oauth.access({
      client_id: this.secrets.SLACK_CLIENT_ID,
      client_secret: this.secrets.SLACK_CLIENT_SECRET,
      code,
      redirect_uri: this.secrets.SLACK_REDIRECT_URL,
    });
    if (!res.ok) throw new Error('Slack response not ok');
    logger.debug(`slack getAccessToken success: response ${JSON.stringify(res)}`);
    return res;
  }

  async getUserId(token: string) {
    const res = await this.slack.auth.test({ token });
    if (!res.ok) throw new Error('Slack response not ok');
    logger.debug(`slack getUserId success: response ${JSON.stringify(res)}`);
    return res;
  }

  async getUserInfo(userId: string) {
    const res = await this.slack.users.info({ user: userId });
    if (!res.ok) throw new Error('Slack response not ok');
    logger.debug(`slack getUserInfo success: response ${res}`);
    return res;
  }
}
