import axios from 'axios';

var instance = axios.create({
    "xsrfCookieName": "myHomemadeCookie",
    "xsrfHeaderName": "csrf-token"
});


export default instance;
