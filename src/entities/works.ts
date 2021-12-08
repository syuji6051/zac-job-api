/* eslint-disable camelcase */
export type WorkType = 'clockIn' | 'clockOut' | 'goOut' | 'returned'

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
