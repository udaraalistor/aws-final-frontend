import ApiService from './apiService';

let SUGGEST = `profile/search`;
let FOLLOW = (id) => `follow/${id}`;
let FEED = `feed`;
let POST = `post`;

async function suggest() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = SUGGEST;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

async function follow(id) {
    console.log(id)
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = FOLLOW(id);
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

async function feed() {
    const apiObject = {};
    apiObject.method = 'GET';
    apiObject.authentication = true;
    apiObject.endpoint = FEED;
    apiObject.body = null;
    return await ApiService.callApi(apiObject);
}

async function post(data) {
    const apiObject = {};
    apiObject.method = 'POST';
    apiObject.authentication = true;
    apiObject.endpoint = POST;
    apiObject.body = data;
    return await ApiService.callApi(apiObject);
}


export default { suggest, follow, feed, post };
