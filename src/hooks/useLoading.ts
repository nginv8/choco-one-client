import { useState, useEffect } from 'react';

const useLoading = (delay = 3000) => {
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setFinished(true), 500);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return { loading, finished };
};

export default useLoading;
