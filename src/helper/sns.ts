import { sns } from '@syuji6051/zac-job-library';
import { WorkType } from '@/src/entities/works';
import { BotMessage, WorkLink } from '@/src/entities/sns';

const {
  PUPPETEER_API_SNS_TOPIC,
  STAGE,
} = process.env;

const workLink = (workType: WorkType) => publish<WorkLink>({
  work_type: workType,
});

const publishBotMessage = (chanel: string, message: string) => publish<BotMessage>({
  chanel, message,
});

const publish = async <T>(data: T, topicArn: string = PUPPETEER_API_SNS_TOPIC || '') => {
  await sns.snsInstance.publish({
    TopicArn: topicArn,
    Message: JSON.stringify(data),
    MessageAttributes: {
      stage: {
        DataType: 'String',
        StringValue: STAGE,
      },
    },
  }).promise();
};

export {
  publish,
  publishBotMessage,
  workLink,
};
