/* eslint-disable camelcase */
import { ZacRegisterParams } from '@syuji6051/zac-client';
import { z } from 'zod';

// export interface ZacWorkRegisterRequestBody extends ZacRegisterParams {}

export interface RegisterZacWorkInput extends ZacRegisterParams {
  userId: string
  zacTenantId: string
  zacLoginId: string
  zacPassword: string
}

export interface RegisterWorksRequestParameter {
  day: string
}

export const zRegisterWorksRequest = z.object({
  day: z.date(),
});

export type RegisterWorksRequest = z.infer<typeof zRegisterWorksRequest>

export const zGetWorkCodeListRequest = z.object({
  yearMonth: z.number(),
});

export const zWorkCode = z.object({
  code: z.string(),
  default: z.boolean(),
});
export type WorkCode = z.infer<typeof zWorkCode>

export const zSetWorkCodeListRequest = z.object({
  yearMonth: z.number(),
  codeList: zWorkCode.array(),
});

export type SetWorkCodeListRequest = z.infer<typeof zSetWorkCodeListRequest>
