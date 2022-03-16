import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BASE_URL_DEV,
  headers: {

  },
});

instance.interceptors.request.use((config) => ({ ...config, headers: { ...config.headers, Authorization: `Bearer ${Cookies.get('accessToken')}` } }));
instance.interceptors.response.use((config) => config, async (error) => {
  if (error.response.status === 401) {
    const originalRequest = error.config;
    try {
      const refreshToken = Cookies.get('refreshToken');
      const response = await instance.post('auth/refresh', refreshToken!);
      Cookies.set('accessToken', response.data.accessToken);
      return await instance.request(originalRequest);
    } catch (e) {
      alert(`${e} НЕ авторизованое быдло`);
    }
  }
  return null;
});

export default instance;
