// import fetch from 'node-fetch';
import { SecretsValues } from '@/src/entities/Environments';
import { ZacWork } from '@/src/entities/Users';
import { container, TYPES } from '@/src/providers/container';
import { sig4Request } from '@/src/lib/axios';

export default class Zac {
  secrets: SecretsValues

  constructor() {
    this.secrets = container.get<SecretsValues>(TYPES.ASM_VALUES);
  }

  public register(props: ZacWork) {
    // eslint-disable-next-line no-undef

    return sig4Request({
      url: `${this.secrets.PUPPETEER_API_URL}/zac/register`,
      data: props,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    });
  }
}
