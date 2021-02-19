import { encrypt } from '@syuji6051/zac-job-library';

import { SecretsValues } from '@/src/entities/Environments';
import { Attribute } from '@/src/entities/Users';

// eslint-disable-next-line import/prefer-default-export
export const getUserAttribute = (secrets: SecretsValues, userAttribute: Attribute): Attribute => {
  const {
    ENCRYPT_KEY,
    ENCRYPT_SALT_KEY,
  } = secrets;
  const encryptedData = encrypt(ENCRYPT_KEY, ENCRYPT_SALT_KEY, userAttribute.password);

  return {
    ...userAttribute,
    password: encryptedData,
  };
};
