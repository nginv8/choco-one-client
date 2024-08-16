import { AxiosRequestConfig } from 'axios';

const getAxiosConfig = (token: string | null): AxiosRequestConfig => {
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export default getAxiosConfig;
