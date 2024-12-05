import axios from 'axios';
import { dadosEmpresa } from '../utils/empresa';

const api = (strToken?: string) => {
  const apiInstance = axios.create({
    baseURL: dadosEmpresa.baseURL,
    ...(strToken
      ? { headers: { Authorization: `Bearer ${strToken}` } }
      : { auth: { username: 'appbiodata', password: '@1qazone56' } }),
  });

  apiInstance.interceptors.request.use(
    (config) => {
      if (config.method === 'get') {
        config.params = config.params || {};
        config.params.idSAC = dadosEmpresa.idSAC;
        config.params.target_url = dadosEmpresa.targetURL;
      } else if (config.method === 'post' || config.method === 'put') {
        config.data = config.data || {};
        config.data.idSAC = dadosEmpresa.idSAC;
        config.data.target_url = dadosEmpresa.targetURL;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return apiInstance;
};

export default api;
