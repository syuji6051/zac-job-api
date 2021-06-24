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
