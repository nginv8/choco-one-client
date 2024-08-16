import { useMutation } from '@tanstack/react-query';
import { createSubscriber, deleteSubscriber } from '@/api';
import { handleQueryErrorMessage } from '@/utils';
import useAlert from './useAlert';

const useCreateSubscriber = () => {
  const { showErrorAlert, showSuccessAlert } = useAlert();

  return useMutation({
    mutationFn: createSubscriber,
    onSuccess: (data) => {
      showSuccessAlert('Thank you!', 'You have successfully subscribed to our newsletter');
      return data;
    },
    onError: (error) => {
      console.error('Error creating subscriber:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', "Couldn't subscribe to our newsletter");
    },
  });
};

const useDeleteSubscriber = () => {
  const { showErrorAlert, showSuccessAlert } = useAlert();

  return useMutation({
    mutationFn: deleteSubscriber,
    onSuccess: (data) => {
      showSuccessAlert('Success!', 'You have successfully unsubscribed from our newsletter');
      return data;
    },
    onError: (error) => {
      console.error('Error deleting subscriber:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', "Couldn't unsubscribe from our newsletter");
    },
  });
};

export { useCreateSubscriber, useDeleteSubscriber };
