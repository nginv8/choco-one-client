type Error = {
  response?: {
    data?: {
      error?: {
        message?: string;
      };
    };
  };
  message?: string;
} | null;

type HandleQueryErrorMessage = (error: Error, defaultErrorMessage?: string) => string;

const handleQueryErrorMessage: HandleQueryErrorMessage = (
  error,
  defaultErrorMessage = 'An unknown error occurred'
) => {
  const axiosError = error?.response?.data?.error?.message || null;
  const errorMessage = error?.message || null;

  return axiosError || errorMessage || defaultErrorMessage;
};

export default handleQueryErrorMessage;
