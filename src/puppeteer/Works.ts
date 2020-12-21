import fetch from 'node-fetch';

const BASE_URL = 'https://3t6zj1468g.execute-api.ap-northeast-1.amazonaws.com/v1';

export class Works {
  public async list(userId: string, password: string, yearMonth: string) {
    console.log('works api call start');
    return fetch(`${BASE_URL}/works`, {
      method: 'POST',
      body: JSON.stringify({
        userId, password, yearMonth
      }),
    }).then(res => res.json())
  }

  public async clockIn(userId: string, password: string) {
    console.log('works api call start');
    return fetch(`${BASE_URL}/works/clockIn`, {
      method: 'POST',
      body: JSON.stringify({
        userId, password,
      }),
    }).then(res => res.json())
  }

  public async clockOut(userId: string, password: string) {
    console.log('works api call start');
    return fetch(`${BASE_URL}/works/clockOut`, {
      method: 'POST',
      body: JSON.stringify({
        userId, password,
      }),
    }).then(res => res.json())
  }

  public async goOut(userId: string, password: string) {
    console.log('works api call start');
    return fetch(`${BASE_URL}/works/goOut`, {
      method: 'POST',
      body: JSON.stringify({
        userId, password,
      }),
    }).then(res => res.json())
  }

  public async goReturn(userId: string, password: string) {
    console.log('works api call start');
    return fetch(`${BASE_URL}/works/goReturn`, {
      method: 'POST',
      body: JSON.stringify({
        userId, password,
      }),
    }).then(res => res.json())
  }
}
