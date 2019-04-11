import axios from 'axios';
import { baseUrl, onlinePrefix, Messages } from "../app-config/config.js";


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
            resolve(error);
            return;
        })
    })
}