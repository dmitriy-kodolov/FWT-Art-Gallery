import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_DEV,
});

instance.interceptors.request.use((config) => {
  config.headers!.Authorization = `${Cookies.get('accessToken')}`;
  return config;
});

export default instance;
