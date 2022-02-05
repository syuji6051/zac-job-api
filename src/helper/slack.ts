import { WorkType } from '@/src/entities/works';

const clockInRegXp = /^(出勤|:remote-syusya:).*/;
const clockOutRegXp = /^(退勤|:remote-taisya:).*/;
const goOutRegXp = /^(外出|:gaisyutsu:).*/;
const goReturnRegXp = /^(再入|:sainyu:).*/;

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

export {
  choiceWorkMessage,
  getWorkTypeName,
};
