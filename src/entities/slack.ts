/* eslint-disable camelcase */
export interface SetUserAttributeRequest {
  code: string
}

type EventActionType = 'rich_text_section' | 'message'

export type EventActionRequest = EventActionVerificationTokenRequest | EventActionMessageRequest;

export interface EventActionVerificationTokenRequest {
  type: 'url_verification',
  token: string
  challenge: string
}

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
