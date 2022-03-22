import { z } from 'zod';

/* eslint-disable camelcase */
export const zWorkType = z.enum(['clockIn', 'clockOut', 'goOut', 'returned']);

export type WorkType = z.infer<typeof zWorkType>

export interface SyncObcWorksInput {
  userId: string
  obcTenantId: string
  obcUserId: string
  obcPassword: string
  period: number
}

export interface PunchWorkInput {
  userId: string
  obcTenantId: string
  obcUserId: string
  obcPassword: string
  token?: string | null
  channel?: string | null
  workType: WorkType
}

export const zPunchWork = z.object({
  workType: zWorkType,
});

export type PunchWork = z.infer<typeof zPunchWork>
export interface PunchWorkRequest {
  work_type: WorkType
}

export interface Work {
  clockIn: string;
  clockOut: string;
  goOut1: string;
  returned1: string;
  goOut2: string;
  returned2: string;
  goOut3: string;
  returned3: string;
  flexTotalTime: string;
  day: string;
}

export const zSyncObcWorksRequest = z.object({
  yearMonth: z.string(),
});

export type SyncObcWorksRequest = z.infer<typeof zSyncObcWorksRequest>
