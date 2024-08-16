import getCategories from './categories';
import { getProducts, getProductById, getProductsByIds } from './product';
import { getOrders, createOrder, getOneOrder } from './order';
import { createSubscriber, deleteSubscriber } from './subscribe';
import createSuportRequest from './support';
import getShopSettings from './shop';
import { getFavorites, updateFavorites } from './favorite';
import {
  signUp,
  signIn,
  getUserData,
  restorePassword,
  updatePassword,
  updateUserData,
  deleteUser,
  resetPassword,
} from './auth';
import config from '@/data/apiConfig';

export {
  config,
  signUp,
  signIn,
  getUserData,
  restorePassword,
  updatePassword,
  updateUserData,
  deleteUser,
  getCategories,
  getProducts,
  getProductById,
  getProductsByIds,
  getShopSettings,
  createOrder,
  getOrders,
  getOneOrder,
  createSuportRequest,
  createSubscriber,
  deleteSubscriber,
  resetPassword,
  getFavorites,
  updateFavorites,
};
