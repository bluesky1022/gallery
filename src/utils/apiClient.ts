import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../redux/store';
import { showAjaxLoading, hideAjaxLoading } from '../redux/slices/ajax.slice';
import { getDeviceInfo } from './getDeviceInfo';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const api = axios.create({
  baseURL: API_ENDPOINT,
});

class AxiosWrapper {
  private showLoading: boolean;
  constructor() {
    this.showLoading = true;

    api.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          store.dispatch(showAjaxLoading());
        }
        return config;
      },
      (error) => {
        if (this.showLoading) {
          store.dispatch(hideAjaxLoading());
        }
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    api.interceptors.response.use(
      (response) => {
        if (this.showLoading) {
          store.dispatch(hideAjaxLoading());
        }
        return response;
      },
      (error) => {
        if (this.showLoading) {
          store.dispatch(hideAjaxLoading());
        }
        return Promise.reject(error);
      }
    );
  }

  setShowLoading(value: boolean) {
    this.showLoading = value;
  }

  private setAuthToken(token: string | null) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }

  private setDeviceId(device_id: string | null) {
    console.log("device_id", device_id);
    if (device_id) {
      api.defaults.headers.common['X-Device-Id'] = device_id;
    } else {
      delete api.defaults.headers.common['X-Device-Id'];
    }
  }

  async publicRequest<T = any>(
    url: string,
    method: AxiosRequestConfig['method'] = 'GET',
    data: any = null,
    showLoading: boolean = true
  ): Promise<AxiosResponse<T>> {
    this.showLoading = showLoading;
    if (this.showLoading) {
      store.dispatch(showAjaxLoading());
    } else {
      store.dispatch(hideAjaxLoading());
    }
    return api({
      url,
      method,
      data,
    });
  }

  async privateRequest<T = any>(
    url: string,
    method: AxiosRequestConfig['method'] = 'GET',
    data: any = null,
    showLoading: boolean = true
  ): Promise<AxiosResponse<T>> {
    this.showLoading = showLoading;
    if (this.showLoading) {
      console.log("loading: ", this.showLoading);
      store.dispatch(showAjaxLoading());
    } else {
      store.dispatch(hideAjaxLoading());
    }
    const token = localStorage.getItem('accessToken');
    this.setAuthToken(token);
    const deviceInfoString = localStorage.getItem('deviceInfo');
    if (deviceInfoString !== null) {
      const deviceInfo = JSON.parse(deviceInfoString);
      const { browser_name } = getDeviceInfo();
      if (deviceInfo.browser_name !== browser_name) {
        console.log("Browser does not match");
        console.log("browser_name, ", browser_name);
        console.log(deviceInfo);
        console.log(browser_name);
        this.setDeviceId(deviceInfoString);
      } else {
        this.setDeviceId(deviceInfoString);
      }
    } else {
      console.warn("No device info found in local storage.");
      this.setDeviceId("");
    }
    return api({
      url,
      method,
      data,
    });
  };
}

const axiosWrapper = new AxiosWrapper();

export const publicRequest = axiosWrapper.publicRequest.bind(axiosWrapper);
export const privateRequest = axiosWrapper.privateRequest.bind(axiosWrapper);
export const setShowLoading = axiosWrapper.setShowLoading.bind(axiosWrapper);

