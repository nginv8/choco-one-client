import axios from 'axios';
import config from '@/data/apiConfig';
import { getAxiosConfig } from '@/utils';

type UpdateFavoriteType = (
  token: string | null,
  products: number[],
  signal?: AbortSignal
) => Promise<{ data: number[] }>;

type GetFavoriteProducts = (token: string | null) => Promise<{ data: number[] }>;

const updateFavorites: UpdateFavoriteType = async (
  token: string | null,
  products: number[],
  signal?: AbortSignal
) => {
  const axiosConfig = getAxiosConfig(token);
  const data = { data: products };

  if (signal) axiosConfig.signal = signal;

  const response = await axios.post(config.FAVORITE_URL, data, axiosConfig);
  return response.data;
};

const getFavorites: GetFavoriteProducts = async (token) => {
  const axiosConfig = getAxiosConfig(token);

  const { data } = await axios.get(config.FAVORITE_URL, axiosConfig);
  return data;
};

export { updateFavorites, getFavorites };
