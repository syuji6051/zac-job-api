import { sns } from '@syuji6051/zac-job-library';
import { WorkType } from '@/src/entities/works';
import { WorkLink } from '@/src/entities/sns';

const {
  PUPPETEER_API_SNS_TOPIC,
  STAGE,
} = process.env;

const workLink = (workType: WorkType) => publish<WorkLink>(PUPPETEER_API_SNS_TOPIC || '', {
  work_type: workType,
});

const publish = async <T>(topicArn: string, data: T) => {
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
  workLink,
};
