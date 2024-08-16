import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  signUp,
  signIn,
  restorePassword,
  updatePassword,
  updateUserData,
  getUserData,
  deleteUser,
  resetPassword,
} from '@/api';
import { UserDataType } from '@/types';
import { useAlert } from '@/hooks';
import useBoundStore from '@/store/useBoundStore';
import { handleQueryErrorMessage } from '@/utils';

type AuthData = {
  user: UserDataType;
  jwt: string;
};

type UpdatePasswordData = {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
};

const useAuth = () => {
  const { showErrorAlert, showSuccessAlert } = useAlert();
  const queryClient = useQueryClient();
  const queryKey = {
    auth: ['user'],
    favorites: ['favorites'],
  };

  const jwt = useBoundStore((state) => state.jwt);
  const saveJwt = useBoundStore((state) => state.setJwt);
  const clearJwt = useBoundStore((state) => state.clearJwt);

  const signOut = () => {
    clearJwt();
    queryClient.setQueryData(queryKey.auth, null);
    queryClient.setQueryData(queryKey.favorites, []);
  };

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      showSuccessAlert('Success:', 'Account has been created.');
    },
    onError: (error) => {
      console.error('Error signing up:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', 'Could not sign up');
    },
  });

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data: AuthData, { rememberMe }) => {
      saveJwt(data.jwt, rememberMe);
      queryClient.setQueryData(queryKey.auth, data.user);
      queryClient.invalidateQueries({ queryKey: queryKey.favorites });
      showSuccessAlert('Success:', 'Signed in successfully.');
    },
    onError: (error) => {
      const errorMessage = handleQueryErrorMessage(error);

      if (errorMessage === 'Invalid identifier or password') {
        showErrorAlert('', 'Invalid email or password. Please try again.');
        return;
      }

      if (errorMessage === 'Your account email is not confirmed') {
        showErrorAlert('', 'Please confirm your email before signing in.');
        return;
      }

      console.error('Error signing in:', errorMessage);
      showErrorAlert('Something went wrong:', 'Could not sign in');
    },
  });

  const restorePasswordMutation = useMutation({
    mutationFn: restorePassword,
    onSuccess: () => {
      showSuccessAlert('Success:', 'A password reset link has been sent to your email.');
    },
    onError: (error) => {
      console.error('Error restoring password:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', 'Could not send reset link.');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data: AuthData) => {
      saveJwt(data.jwt, false);
      showSuccessAlert('Success:', 'Password has been reset.');
    },
    onError: (error) => {
      console.error('Error resetting password:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', 'Could not reset password');
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: UpdatePasswordData) => updatePassword(data, jwt),
    onSuccess: (data) => {
      if (!data.jwt) {
        signOut();
        return;
      }
      saveJwt(data.jwt, false);
      showSuccessAlert('Success:', 'Password has been updated.');
    },
    onError: (error) => {
      console.error('Error updating password:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', 'Could not update password');
    },
  });

  const updateUserDataMutation = useMutation({
    mutationFn: (data: UserDataType) => updateUserData(data, jwt),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey.auth, data);
      showSuccessAlert('Success:', 'Account information has been updated.');
    },
    onError: (error) => {
      console.error('Error updating user data:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', 'Could not update user data');
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: () => deleteUser(jwt),
    onSuccess: () => {
      signOut();
      showSuccessAlert('Success:', 'Your account has been deleted!');
    },
    onError: (error) => {
      console.error('Error deleting user:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', 'Could not delete user');
    },
  });

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: queryKey.auth,
    queryFn: () => getUserData(jwt),
    select: useCallback((userData: UserDataType) => userData, []),
    staleTime: 1000 * 60 * 60,
    enabled: !!jwt,
  });

  return {
    jwt,
    data,
    isLoading,
    isFetching,
    error,
    signUpMutation,
    signInMutation,
    signOut,
    restorePasswordMutation,
    resetPasswordMutation,
    updatePasswordMutation,
    updateUserDataMutation,
    deleteUserMutation,
  };
};

export default useAuth;
