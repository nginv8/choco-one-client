import axios from 'axios';
import config from '@/data/apiConfig';

async function getPageByName(pageName: string) {
  const query = new URLSearchParams({
    'filters[name][$eq]': pageName,
  }).toString();

  const { data } = await axios.get(`${config.PAGE_URL}?${query}`);
  return data;
}
export default getPageByName;
