import axios from 'axios';
import config from '@/data/apiConfig';
import { createPaginationParams } from '@/utils';

const getCategories = async (page: number, pageSize: number) => {
  const pagination = createPaginationParams(page, pageSize);

  const response = await axios.get(`${config.CATEGORIES_URL}/?${pagination}`);
  return response.data;
};

export default getCategories;
