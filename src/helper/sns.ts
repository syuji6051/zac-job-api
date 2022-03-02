import { sns } from '@syuji6051/zac-job-library';
import { BotMessage } from '@/src/entities/sns';
import { PunchWorkInput } from '@/src/entities/works';

const {
  PUPPETEER_API_SNS_TOPIC,
  PUPPETEER_PUNCH_WORK_SNS_TOPIC,
} = process.env;

const publishPunchWork = async (messages: PunchWorkInput) => {
  await sns.publish<PunchWorkInput>(messages, PUPPETEER_PUNCH_WORK_SNS_TOPIC || '');
};

const publishBotMessage = (chanel: string, message: string) => sns.publish<BotMessage>({
  chanel, message,
}, PUPPETEER_API_SNS_TOPIC || '');

export {
  publishPunchWork, publishBotMessage,
};
