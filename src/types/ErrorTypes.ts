type ErrorResponse = {
  response?: {
    data?: {
      error?: {
        message?: string;
      };
    };
  };
  message?: string;
};

export default ErrorResponse;
