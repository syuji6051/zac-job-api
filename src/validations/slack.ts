import { getAjv } from '@syuji6051/zac-job-library';

import SetUserAttributeRequestJson from '@/src/validations/schema/PostUserAttributeRequest.json';
import EventActionRequestJson from '@/src/validations/schema/EventActionRequest.json';

const ajv = getAjv({ removeAdditional: true });

// eslint-disable-next-line import/prefer-default-export
export const SetUserAttributeValidateFunc = ajv.compile(
  SetUserAttributeRequestJson,
);

export const EventActionRequestValidateFunc = ajv.compile(
  EventActionRequestJson,
);
