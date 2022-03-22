/* eslint-disable camelcase */
import { z } from 'zod';

export const zSetUserAttributeRequest = z.object({
  code: z.string(),
});
export type SetUserAttributeRequest = z.infer<typeof zSetUserAttributeRequest>;

type EventActionType = 'rich_text_section' | 'message'

export const zEventActionVerificationTokenRequest = z.object({
  type: z.enum(['url_verification']),
  token: z.string(),
  challenge: z.string(),
});
export type EventActionVerificationTokenRequest
  = z.infer<typeof zEventActionVerificationTokenRequest>

export type EventActionRequest = EventActionVerificationTokenRequest | EventActionMessageRequest;

export interface EventActionMessageRequest {
  type: EventActionType
  token: string
  team_id: string
  api_app_id: String
  event: {
      type: string,
      bot_id?: string
      client_msg_id?: string
      channel: string,
      user: string,
      text: string,
      ts: string,
      event_ts: string,
      channel_type: string
  },
  authed_teams: string [],
  event_id: string,
  event_time: number
}

export interface EventActionResponse {
  challenge?: string
}

export interface UserInfo {
  userId: string
  userName: string
  accessToken: string
}
