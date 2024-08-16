import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

const useProductListPage = () => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const size = useWindowSize();

  useEffect(() => {
    if (size === 'xl') {
      setItemsPerPage(8);
      setPage(1);
    } else if (size === 'lg') {
      setItemsPerPage(6);
      setPage(1);
    } else if (size === 'md' || size === 'sm') {
      setItemsPerPage(4);
      setPage(1);
    } else {
      setItemsPerPage(3);
      setPage(1);
    }
  }, [size]);

  return { page, setPage, itemsPerPage };
};

export default useProductListPage;
