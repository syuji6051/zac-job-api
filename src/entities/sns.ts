/* eslint-disable camelcase */
import { slack } from '@syuji6051/zac-job-interface';
import { WorkType } from '@/src/entities/works';

export interface WorkLink {
  work_type: WorkType
}

export type PublishSnsToSlackMessages = slack.PublishSnsToSlackMessage [];
