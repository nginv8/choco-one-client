import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { MdErrorOutline, MdInfoOutline } from 'react-icons/md';
import { PiWarning } from 'react-icons/pi';
import useBoundStore from '@/store/useBoundStore';

const useAlert = () => {
  const showAlert = useBoundStore((state) => state.showAlert);
  const config = {
    shouldClose: true,
    timeToClose: 3000,
  };

  const showErrorAlert = (title: string, message: string) => {
    showAlert({
      ...config,
      title,
      message,
      IconComponent: MdErrorOutline,
      variant: 'error',
    });
  };

  const showSuccessAlert = (title: string, message: string) => {
    showAlert({
      ...config,
      title,
      message,
      IconComponent: HiOutlineCheckCircle,
      variant: 'success',
    });
  };

  const showInfoAlert = (title: string, message: string) => {
    showAlert({
      ...config,
      title,
      message,
      IconComponent: MdInfoOutline,
      variant: 'info',
    });
  };

  const showWarningAlert = (title: string, message: string) => {
    showAlert({
      ...config,
      title,
      message,
      IconComponent: PiWarning,
      variant: 'warning',
    });
  };

  return { showErrorAlert, showSuccessAlert, showInfoAlert, showWarningAlert };
};

export default useAlert;
