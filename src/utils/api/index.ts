import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_DEV,
});

instance.interceptors.request.use((config) => ({ ...config, headers: { ...config.headers, Authorization: `Bearer ${Cookies.get('accessToken')}` } }));

export default instance;
