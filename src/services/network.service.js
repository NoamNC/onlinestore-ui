import cookie from "react-cookies";
import config from '../app/enviroment/index';

const baseUrl = config.url + config.api;
export default class Network {
  getHeaders(customHeaders) {
    let headers = {};
    if (this.getToken()) {
      headers.Authorization = this.getToken();
    }
    for (let prop in customHeaders) {
      headers[prop] = customHeaders[prop];
    }
    return headers;
  }
  getToken() {
    return cookie.load("user");
  }

  send(method, url, data) {
    return fetch(baseUrl + url, {
      method: method,
      body: JSON.stringify(data),
      headers: this.getHeaders({'Content-Type': 'application/json'})
    });
  }

  sendMultipart(method, url, data) {
    return fetch(baseUrl + url, {
      method: method,
      body: data,
      headers: this.getHeaders()
    });
  }
}
