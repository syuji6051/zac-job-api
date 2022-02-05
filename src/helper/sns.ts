import { sns } from '@syuji6051/zac-job-library';
import { BotMessage } from '@/src/entities/sns';

const {
  PUPPETEER_API_SNS_TOPIC,
} = process.env;

const publishBotMessage = (chanel: string, message: string) => sns.publish<BotMessage>({
  chanel, message,
}, PUPPETEER_API_SNS_TOPIC || '');

export {
  // eslint-disable-next-line import/prefer-default-export
  publishBotMessage,
};
