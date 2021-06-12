/* eslint-disable import/first */
import { getSecretsManager } from '@syuji6051/zac-job-library';
import { asyncModule } from '@/src/helper/container';

import { SecretsValues } from '@/src/entities/environments';
import { TYPES } from '@/src/providers/container';

// eslint-disable-next-line import/prefer-default-export
export const asyncAsmContainerModule = () => asyncModule<SecretsValues>(
  getSecretsManager<SecretsValues>(), TYPES.ASM_VALUES,
);
