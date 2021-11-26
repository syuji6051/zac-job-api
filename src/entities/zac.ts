/* eslint-disable camelcase */
import { ZacRegisterParams } from '@syuji6051/zac-client';

// export interface ZacWorkRegisterRequestBody extends ZacRegisterParams {}

export interface ZacWork extends ZacRegisterParams {
  userId: string
}

export interface RegisterWorksRequestParameter {
  day: string
}

export interface RegisterWorksRequest {
  day: Date
}

export interface GetWorkCodeListRequest {
  year_month: number
}

export interface SetWorkCodeListRequest {
  year_month: number
  code_list: WorkCode []
}

export interface WorkCode {
  code: string
  default: boolean
}
