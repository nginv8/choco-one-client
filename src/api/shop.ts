import axios from 'axios';
import config from '@/data/apiConfig';

const getShopSettings = async () => {
  const response = await axios.get(`${config.SHOP_URL}?populate=*`);
  return response.data;
};

export default getShopSettings;
