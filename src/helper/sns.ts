import { works } from '@syuji6051/zac-job-interface';
import { sns } from '@syuji6051/zac-job-library';
import { SyncObcWorksInput } from '@/src/entities/works';
import { RegisterZacWorkInput } from '@/src/entities/zac';

const {
  PUPPETEER_PUNCH_WORK_SNS_TOPIC,
  PUPPETEER_SYNC_OBC_WORKS_SNS_TOPIC,
  PUPPETEER_REGISTER_ZAC_WORK_SNS_TOPIC,
} = process.env;

const publishSyncObcWorks = async (messages: SyncObcWorksInput) => {
  await sns.publish<SyncObcWorksInput>(messages, PUPPETEER_SYNC_OBC_WORKS_SNS_TOPIC || '');
};

const publishPunchWork = async (messages: works.PunchWorkInput) => {
  await sns.publish<works.PunchWorkInput>(messages, PUPPETEER_PUNCH_WORK_SNS_TOPIC || '');
};

const publishRegisterZacWork = async (messages: RegisterZacWorkInput) => {
  await sns.publish<RegisterZacWorkInput>(messages, PUPPETEER_REGISTER_ZAC_WORK_SNS_TOPIC || '');
};

export {
  publishRegisterZacWork, publishPunchWork, publishSyncObcWorks,
};
