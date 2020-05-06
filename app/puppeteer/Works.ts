import fetch from 'node-fetch';

const BASE_URL = 'https://49ndgrs353.execute-api.ap-northeast-1.amazonaws.com/v1';

export class Works {
  public async list(userId: string, password: string, yearMonth: string) {
    console.log('works api call start');
    return fetch(`${BASE_URL}/works`, {
      method: 'POST',
      body: JSON.stringify({
        userId, password, yearMonth
      }),
    }).then(res => res.json());
  }
}
