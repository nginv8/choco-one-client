import axios from 'axios';
import config from '@/data/apiConfig';
import { SupportRequesType } from '@/types';
import { getAxiosConfig } from '@/utils';

type Params = {
  data: SupportRequesType;
  token: string | null;
};

const createSuportRequest = async ({ data, token }: Params) => {
  const axiosConfig = getAxiosConfig(token);

  const response = await axios.post(config.SUPPORT_URL, { data }, axiosConfig);
  return response.data;
};

export default createSuportRequest;
