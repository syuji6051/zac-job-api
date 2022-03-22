import { WorkType } from '@/src/entities/works';
import { secrets } from '@syuji6051/zac-job-interface';
import { services } from '@syuji6051/zac-job-library';

const clockInRegXp = /^(出勤|:remote-syusya:|ws).*/;
const clockOutRegXp = /^(退勤|:remote-taisya:|we).*/;
const goOutRegXp = /^(外出|:gaisyutsu:|wo).*/;
const goReturnRegXp = /^(再入|:sainyu:|wr).*/;

const workTypeAttribute = {
  clockIn: {
    name: '出勤',
  },
  clockOut: {
    name: '退勤',
  },
  goOut: {
    name: '外出',
  },
  returned: {
    name: '再入',
  },
};

const choiceWorkMessage = (text: string): WorkType | undefined => {
  switch (true) {
    case clockInRegXp.test(text):
      return 'clockIn';
    case clockOutRegXp.test(text):
      return 'clockOut';
    case goOutRegXp.test(text):
      return 'goOut';
    case goReturnRegXp.test(text):
      return 'returned';
    default:
      return undefined;
  }
};

const getWorkTypeName = (workType: WorkType): string => workTypeAttribute[workType].name;

const sendSlackError = async (secret: secrets.SecretsValues, chanel: string, message: string) => {
  await services.errors.SlackError.build(
    secret.SNS_SLACK_MESSAGE_TOPIC,
    {
      token: secret.SLACK_TOKEN,
      chanel,
      message,
    },
  );
};

export {
  choiceWorkMessage,
  getWorkTypeName,
  sendSlackError,
};
