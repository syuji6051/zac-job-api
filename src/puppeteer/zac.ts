import { request } from '@syuji6051/zac-job-library';
import { SecretsValues } from '@/src/entities/environments';
import { ZacWork } from '@/src/entities/users';
import { container, TYPES } from '@/src/providers/container';

export default class Zac {
  secrets: SecretsValues

  constructor() {
    this.secrets = container.get<SecretsValues>(TYPES.ASM_VALUES);
  }

  public register(props: ZacWork) {
    return request({
      url: `${this.secrets.PUPPETEER_API_URL}/zac/register`,
      data: props,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
