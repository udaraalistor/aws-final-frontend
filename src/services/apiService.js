import axios from 'axios';
import apiConfig from './apiConfig';
import * as config from '../constance/Config';
import AsyncStorage from '@react-native-community/async-storage';
import { StorageStrings } from '../constance/StorageStrings';

async function callApi(apiObject) {
    let body = {};
    let headers;
    let method = apiObject.method ? apiObject.method.toLowerCase() : 'get';
    if (method === 'post' || method === 'put') {
        if (!apiObject.multipart) {
            body = apiObject.body ? JSON.stringify(apiObject.body) : {};
        } else {
            body = apiObject.body ? apiObject.body : {};
        }
    }

    headers = {
        'Content-Type': apiObject.multipart ? 'multipart/form-data' : 'application/json',
    };
    if (apiObject.authentication) {
        let token = await AsyncStorage.getItem(StorageStrings.USERTOKEN);
        headers.Authorization = 'Bearer ' + token;
    }
    let serverUrl = apiConfig.serverUrl;
    let basePath = apiConfig.basePath;

    if (apiObject.basePath) {
        basePath = apiObject.basePath;
    }
    const url = `${serverUrl}/${basePath}/${apiObject.endpoint}`;
    let result;

    await axios[method](url, method !== 'get' && method !== 'delete' ? body : { headers: headers }, { headers: headers })
        .then(async response => {
            result = await response.data;
        })
        .catch(async error => {
            if (error !== undefined) {
                if (error.response === undefined) {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Your connection was interrupted',
                        data: null,
                    };
                } else if (error.response.status === 401) {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Unauthorized',
                        data: null,
                    };

                    // need to re-new token, redirect to login page

                } else if (error.response.status === 403) {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Access is denied.',
                        data: null,
                    };
                } else if (error.response.status === 417) {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Oops! Something went wrong.',
                        data: null,
                    };
                } else if (error.response.data !== undefined) {
                    result = await {
                        success: false,
                        status: 0,
                        message: error.response.data.message,
                        data: null,
                    };
                } else {
                    result = await {
                        success: false,
                        status: 2,
                        message: 'Sorry, something went wrong.',
                        data: null,
                    };
                }
            } else {
                result = await {
                    success: false,
                    status: 2,
                    message: 'Your connection was interrupted!',
                    data: null,
                };
            }
        });

    return result;
}

export default { callApi };
