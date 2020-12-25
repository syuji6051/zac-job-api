// import intercept from 'fetch-intercept';
// import { RequestInit } from 'node-fetch';
// import { sig4Request } from '@/lib/sig4';

// intercept.register({
//   request: (url, config: RequestInit | undefined) => {
//     if (config && config.headers) {
//       const headers = config.headers as { [key: string]: string };
//       if (headers['x-internal-sig4-request']) {
//         return sig4Request(url, config);
//       }
//     }
//     return [url, config];
//   },
// });
