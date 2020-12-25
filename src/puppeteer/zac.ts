// import fetch from 'node-fetch';
import { SecretsValues } from '@/entities/Environments';
import { ZacWork } from '@/entities/Users';
import { container, TYPES } from '@/providers/container';
import { sig4Request } from '@/lib/axios';

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
