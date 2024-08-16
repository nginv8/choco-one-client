import { useMutation } from '@tanstack/react-query';
import { createSuportRequest } from '@/api';
import { RawSupportData, SupportRequesType } from '@/types';
import useAuth from './useAuth';
import useAlert from './useAlert';
import { handleQueryErrorMessage } from '@/utils';

const useSupportRequest = () => {
  const { showErrorAlert, showSuccessAlert } = useAlert();
  const token = useAuth().jwt;

  return useMutation({
    mutationFn: (data: SupportRequesType) => createSuportRequest({ data, token }),
    onSuccess: (data: RawSupportData) => {
      showSuccessAlert('Support request created:', 'We will get back to you soon');
      return data;
    },
    onError: (error) => {
      console.error('Error creating order:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', 'Could not create support request');
    },
  });
};

export default useSupportRequest;
