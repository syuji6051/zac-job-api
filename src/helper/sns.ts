import { sns } from '@syuji6051/zac-job-library';
import { WorkType } from '@/src/entities/works';
import { BotMessage, WorkLink } from '@/src/entities/sns';

const {
  PUPPETEER_API_SNS_TOPIC,
} = process.env;

const publishBotMessage = (chanel: string, message: string) => sns.publish<BotMessage>({
  chanel, message,
}, PUPPETEER_API_SNS_TOPIC || '');

export {
  publishBotMessage,
  workLink,
};
