import axios from 'axios';
import config from '@/data/apiConfig';
import { UserDataType } from '@/types';
import { getAxiosConfig } from '@/utils';

type SignUpData = {
  username: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

type Credentials = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

type UpdatePasswordData = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

type ResetPassword = {
  code: string;
  password: string;
  passwordConfirmation: string;
};

const signUp = async (userData: SignUpData) => {
  const response = await axios.post(config.SIGN_UP_URL, userData);
  return response.data;
};

const signIn = async (credentials: Credentials) => {
  const response = await axios.post(config.SIGN_IN_URL, credentials);
  return response.data;
};

const restorePassword = async (email: string) => {
  const response = await axios.post(config.RESTORE_PASSWORD_URL, { email });
  return response.data;
};

const updatePassword = async (data: UpdatePasswordData, token: string | null) => {
  const axiosConfig = getAxiosConfig(token);

  const response = await axios.post(config.UPDATE_PASSWORD_URL, data, axiosConfig);
  return response.data;
};

const updateUserData = async (data: UserDataType, token: string | null) => {
  const axiosConfig = getAxiosConfig(token);

  const response = await axios.put(config.USER_DATA_URL, data, axiosConfig);
  return response.data;
};

const getUserData = async (token: string | null) => {
  const axiosConfig = getAxiosConfig(token);

  const response = await axios.get<UserDataType>(config.USER_DATA_URL, axiosConfig);
  return response.data;
};

const deleteUser = async (token: string | null) => {
  const axiosConfig = getAxiosConfig(token);

  const response = await axios.delete(config.USER_DATA_URL, axiosConfig);
  return response.data;
};

const resetPassword = async (data: ResetPassword) => {
  const response = await axios.post(config.RESET_PASSWORD_URL, data);
  return response.data;
};

export {
  signUp,
  signIn,
  getUserData,
  restorePassword,
  updatePassword,
  updateUserData,
  deleteUser,
  resetPassword,
};
