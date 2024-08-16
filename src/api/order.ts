import axios from 'axios';
import config from '@/data/apiConfig';
import { CreatedOrderType, RawOrder, RawOrderList } from '@/types';
import { createPaginationParams, createPopulateParams, getAxiosConfig } from '@/utils';

type GetOrdersParams = {
  token: string | null;
  page?: number;
  pageSize?: number;
};
type GetOneOrderParams = {
  token: string | null;
  id: number;
};
type GetOrdersType = (Params: GetOrdersParams) => Promise<RawOrderList>;
type GetOneOrderType = (Params: GetOneOrderParams) => Promise<RawOrder>;

const getOneOrder: GetOneOrderType = async ({ token, id }) => {
  const axiosConfig = getAxiosConfig(token);

  const response = await axios.get(`${config.ORDER_URL}/${id}`, axiosConfig);
  return response.data;
};

const getOrders: GetOrdersType = async ({ token, page = 1, pageSize = 10 }) => {
  const axiosConfig = getAxiosConfig(token);
  const pagination = createPaginationParams(page, pageSize);
  const populate = createPopulateParams(['customer', 'products', 'deliveryAddress']);

  const response = await axios.get(`${config.ORDER_URL}/?${pagination}&${populate}`, axiosConfig);
  return response.data;
};

const createOrder = async (orderData: CreatedOrderType) => {
  const response = await axios.post(config.ORDER_URL, orderData);
  return response.data;
};

export { getOrders, getOneOrder, createOrder };
