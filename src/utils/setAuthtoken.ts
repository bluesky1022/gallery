import request from './../utils/request';

export const setAuthToken = (token : any) => {
    if (token) {
      request.defaults.headers.common['Authorization'] = token;
    } else {
      delete request.defaults.headers.common['Authorization'];
    }
}