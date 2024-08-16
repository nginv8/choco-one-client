import axios from 'axios';
import config from '@/data/apiConfig';

type Subscriber = {
  email: string;
};

const createSubscriber = async ({ email }: Subscriber) => {
  const data = { data: { email } };
  const response = await axios.post(config.SUBSCRIBER_URL, data);
  return response.data;
};

const deleteSubscriber = async ({ email }: Subscriber) => {
  const response = await axios.delete(`${config.SUBSCRIBER_URL}/${email}`);
  return response.data;
};

export { createSubscriber, deleteSubscriber };
