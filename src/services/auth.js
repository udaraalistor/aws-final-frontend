import ApiService from './apiService';

let SIGNIN_URL = `auth/sign-in`;
let SIGNUP_URL = `auth/sign-up`;

async function signin(userCredentials) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.endpoint = SIGNIN_URL;
    apiObject.body = userCredentials;
    return await ApiService.callApi(apiObject);
}

async function signup(userCredentials) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = false;
    apiObject.endpoint = SIGNUP_URL;
    apiObject.body = userCredentials;
    return await ApiService.callApi(apiObject);
}

export default { signin, signup };
