import { getAjv } from '@syuji6051/zac-job-library';

import SetUserAttributeRequestJson from '@/src/validations/schema/PostUserAttributeRequest.json';
import EventActionRequestJson from '@/src/validations/schema/EventActionRequest.json';
import BotMessagesRequestJson from '@/src/validations/schema/BotMessagesRequest.json';

const ajv = getAjv({ removeAdditional: true });

export const SetUserAttributeValidateFunc = ajv.compile(
  SetUserAttributeRequestJson,
);

export const EventActionRequestValidateFunc = ajv.compile(
  EventActionRequestJson,
);

export const BotMessagesRequestValidationFunc = ajv.compile(
  BotMessagesRequestJson,
);
