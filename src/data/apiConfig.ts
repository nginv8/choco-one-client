const HOSTNAME = import.meta.env.VITE_HOSTNAME || 'localhost';
const PORT = import.meta.env.VITE_PORT ? `:${import.meta.env.VITE_PORT}` : '';
const PROTOCOL = import.meta.env.VITE_PROTOCOL ? `${import.meta.env.VITE_PROTOCOL}://` : 'http://';
const HOST = `${PROTOCOL}${HOSTNAME}${PORT}`;
const API_URL = `${HOST}/api`;
const MEDIA_URL = import.meta.env.VITE_MEDIA_HOST_TYPE === 'local' ? HOST : '';

const PAGE_URL = `${API_URL}/pages`;
const PRODUCTS_URL = `${API_URL}/products`;
const CATEGORIES_URL = `${API_URL}/categories`;
const FAVORITE_URL = `${API_URL}/favorites`;
const ORDER_URL = `${API_URL}/orders`;
const SUPPORT_URL = `${API_URL}/supports`;
const SUBSCRIBER_URL = `${API_URL}/subscribers`;
const SHOP_URL = `${API_URL}/shop`;
const USER_DATA_URL = `${API_URL}/users/me`;
const SIGN_UP_URL = `${API_URL}/auth/local/register`;
const SIGN_IN_URL = `${API_URL}/auth/local`;
const RESTORE_PASSWORD_URL = `${API_URL}/auth/forgot-password`;
const RESET_PASSWORD_URL = `${API_URL}/auth/reset-password`;
const UPDATE_PASSWORD_URL = `${API_URL}/auth/change-password`;

export default {
  HOSTNAME,
  PORT,
  HOST,
  API_URL,
  MEDIA_URL,
  PRODUCTS_URL,
  CATEGORIES_URL,
  SUBSCRIBER_URL,
  FAVORITE_URL,
  ORDER_URL,
  SIGN_UP_URL,
  SIGN_IN_URL,
  SUPPORT_URL,
  RESTORE_PASSWORD_URL,
  UPDATE_PASSWORD_URL,
  USER_DATA_URL,
  PAGE_URL,
  SHOP_URL,
  RESET_PASSWORD_URL,
};
