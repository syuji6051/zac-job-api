/* eslint-disable import/first */
import { secrets } from '@syuji6051/zac-job-interface';
import { getSecretsManager } from '@syuji6051/zac-job-library';
import { asyncModule } from '@/src/helper/container';

import { TYPES } from '@/src/providers/container';

// eslint-disable-next-line import/prefer-default-export
export const asyncAsmContainerModule = () => asyncModule<secrets.SecretsValues>(
  getSecretsManager<secrets.SecretsValues>(), TYPES.ASM_VALUES,
);
