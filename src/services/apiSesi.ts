import axios from 'axios';
import { dadosEmpresa } from '../utils/empresa';

const apiSesi = () => {
  const apiInstance = axios.create({
    // baseURL: dadosEmpresa.baseURLSesi,
    baseURL: '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiInstance.interceptors.request.use(
    (config) => {
      if (config.method === 'get') {
        config.params = config.params || {};
      } else if (config.method === 'post' || config.method === 'put') {
        config.data = config.data || {};
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return apiInstance;
};

export default apiSesi;
