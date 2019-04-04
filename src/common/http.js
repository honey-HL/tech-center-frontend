import axios from 'axios';
import { baseUrl, onlinePrefix, Messages } from "../app-config/config.js";

const checkErrorMessage = (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: return '请求错误(400)' ;
        case 401: return '未授权，请重新登录(401)';
        case 403: return '拒绝访问(403)';
        case 404: return '请求出错(404)';
        case 408: return '请求超时(408)';
        case 500: return '服务器错误(500)';
        case 501: return '服务未实现(501)';
        case 502: return '网络错误(502)';
        case 503: return '服务不可用(503)';
        case 504: return '网络超时(504)';
        case 505: return 'HTTP版本不受支持(505)';
        default: return `连接出错(${error.response.status})!`;
      }
    }
    return '连接服务器失败!'
  }

export const http = async(url, params, production) => {
    return new Promise (async (resolve, reject) => {
        const config = {
            baseURL: production? onlinePrefix: baseUrl, 
            url: url, 
            method: params.method ? params.method : 'get',
            timeout: 10000,
            params: params ? params : {}
            // data: params.body ? params.body : {}
            // headers: {
            //   'Access-Control-Allow-Origin': '*',
            // }
        }
        axios(config).then((response) => {
            console.log(response);
            if (response.status === 200) {
              resolve(response.data);
              return;
            }
            reject(Messages.internalServerError);
          }).catch((error) => {
            console.log(error);
            if (axios.isCancel(error)) {
              reject(null);
              return;
            }
            if (error.response && error.response.status === 401) {
            //   getAccessToken();
            }
            reject(checkErrorMessage(error));
        })
    })
}