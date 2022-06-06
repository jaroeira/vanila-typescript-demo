export interface httpRequestParams {
  url: string;
  method: string;
  body?: any;
}

export class HttpClient {
  static async get(params: httpRequestParams) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open(params.method, params.url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText,
          });
        }
      };
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText,
        });
      };

      if (params.body) {
        request.setRequestHeader(
          'Content-Type',
          'application/json;charset=UTF-8'
        );
        params.body = JSON.stringify(params.body);
      }
      request.send(params.body);
    });
  }
}
