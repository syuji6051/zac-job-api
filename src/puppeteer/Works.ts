import { sig4Request } from '@/lib/axios';

const BASE_URL = 'https://3t6zj1468g.execute-api.ap-northeast-1.amazonaws.com/v1';

export default class Works {
  public async list(userId: string, password: string, yearMonth: string) {
    console.log('works api call start');
    return sig4Request({
      url: `${BASE_URL}/works`,
      method: 'POST',
      data: {
        userId, password, yearMonth,
      },
    }).then((res) => res.data);
  }

  public async clockIn(userId: string, password: string) {
    console.log('works api call start');
    return sig4Request({
      url: `${BASE_URL}/works/clockIn`,
      method: 'POST',
      data: {
        userId, password,
      },
    }).then((res) => res.data);
  }

  public async clockOut(userId: string, password: string) {
    console.log('works api call start');
    return sig4Request({
      url: `${BASE_URL}/works/clockOut`,
      method: 'POST',
      data: {
        userId, password,
      },
    }).then((res) => res.data);
  }

  public async goOut(userId: string, password: string) {
    console.log('works api call start');
    return sig4Request({
      url: `${BASE_URL}/works/goOut`,
      method: 'POST',
      data: {
        userId, password,
      },
    }).then((res) => res.data);
  }

  public async goReturn(userId: string, password: string) {
    console.log('works api call start');
    return sig4Request({
      url: `${BASE_URL}/works/goReturn`,
      method: 'POST',
      data: {
        userId, password,
      },
    }).then((res) => res.data);
  }
}
