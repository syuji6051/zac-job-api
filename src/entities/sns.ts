/* eslint-disable camelcase */
import { WorkType } from '@/src/entities/works';

export interface WorkLink {
  work_type: WorkType
}

export type BotMessages = BotMessage [];

export interface BotMessage {
  chanel: string
  message: string
}
