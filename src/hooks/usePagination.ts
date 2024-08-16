import { useMemo } from 'react';

const usePagination = (currentPage: number = 0, totalPages: number = 0) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const isShort = totalPages < 5;

  const getPageNumbers = (): (number | string)[] => {
    if (isShort) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const isStartSpaced = currentPage > 3;
    const isEndSpaced = currentPage < totalPages - 2;
    const numbers: (number | string)[] = [1];

    if (currentPage <= 2) numbers.push(2, 3);
    else if (isStartSpaced) numbers.push('...');

    if (currentPage > 2 && currentPage < totalPages - 1) {
      numbers.push(currentPage - 1, currentPage, currentPage + 1);
    }

    if (isEndSpaced) {
      numbers.push('...', totalPages);
    } else if (currentPage >= totalPages - 1) {
      numbers.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      numbers.push(totalPages);
    }

    return numbers;
  };

  const pageNumbers = useMemo(() => getPageNumbers(), [currentPage, totalPages]);

  return {
    isFirstPage,
    isLastPage,
    isShort,
    pageNumbers,
  };
};

export default usePagination;
