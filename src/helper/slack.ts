import { WorkType } from '@/src/entities/works';
import { secrets } from '@syuji6051/zac-job-interface';
import { services } from '@syuji6051/zac-job-library';

const clockInRegXp = /^(出勤|:remote-syusya:|ws|syusya).*/;
const clockOutRegXp = /^(退勤|:remote-taisya:|wt|taisya).*/;
const goOutRegXp = /^(外出|:gaisyutsu:|go|gaisyutsu).*/;
const goReturnRegXp = /^(再入|:sainyu:|gr|sainyu).*/;

const workTypeAttribute = {
  clockIn: {
    name: '出勤',
    icon: ':remote-syusya:',
  },
  clockOut: {
    name: '退勤',
    icon: ':remote-taisya:',
  },
  goOut: {
    name: '外出',
    icon: ':gaisyutsu:',
  },
  returned: {
    name: '再入',
    icon: ':sainyu:',
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

const getWorkTypeIcon = (workType: WorkType): string => workTypeAttribute[workType].icon;

const sendSlackError = async (secret: secrets.SecretsValues, channel: string, message: string) => {
  await services.errors.SlackError.build(
    secret.SNS_SLACK_MESSAGE_TOPIC,
    {
      token: secret.SLACK_TOKEN,
      channel,
      message,
    },
  );
};

export {
  choiceWorkMessage,
  getWorkTypeName,
  getWorkTypeIcon,
  sendSlackError,
};
