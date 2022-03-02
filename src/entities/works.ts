/* eslint-disable camelcase */
export type WorkType = 'clockIn' | 'clockOut' | 'goOut' | 'returned'

export interface PunchWorkInput {
  userId: string
  obcTenantId: string
  obcUserId: string
  obcPassword: string
  workType: WorkType
}

export interface PunchWork {
  workType: WorkType
}
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

export interface WorkSyncRequestParameter {
  year_month: string
}

export interface WorkSyncRequest {
  yearMonth: string
}
