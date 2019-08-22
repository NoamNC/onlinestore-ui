export default class Network {


    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        };
        if(this.getToken()) {
            headers.Authorization = this.getToken();
        }
        return headers;
    }

    getToken() {
        return document.cookie.split('user=')[1];
    }

    send(method, url, data) {
        return fetch('http://localhost:4000/api' + url, {
            method: method,
            body: JSON.stringify(data),
            headers: this.getHeaders()
        });
    }
}