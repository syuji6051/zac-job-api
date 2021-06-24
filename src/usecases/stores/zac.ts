/* eslint-disable no-unused-vars */
import { ZacWork } from '@/src/entities/zac';

interface Zac {
  register(props: ZacWork): Promise<void>;
}

export default Zac;
