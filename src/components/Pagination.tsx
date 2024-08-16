import { FC } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { cn, randomString } from '@/utils';
import { Button } from '@/components/ui';
import { usePagination } from '@/hooks';

type PaginationProps = {
  className?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, className }) => {
  const page = currentPage || 1;
  const { isFirstPage, isLastPage, isShort, pageNumbers } = usePagination(page, totalPages);

  if (!totalPages || totalPages <= 1) return null;

  const handlePageChange = (nextPage: number) => {
    if (nextPage !== page && onPageChange) {
      onPageChange(nextPage);
    }
  };

  return (
    <nav className={cn('flex items-end justify-center gap-2', className)}>
      {!isShort && (
        <Button
          label="Go to previous page"
          size="icon-sm"
          onClick={() => handlePageChange(page - 1)}
          disabled={isFirstPage}
          variant="secondary"
        >
          <HiChevronLeft className="size-5" />
        </Button>
      )}
      {pageNumbers.map((number) =>
        typeof number === 'number' ? (
          <Button
            label={`Go to page ${number}`}
            size="icon-sm"
            key={number}
            onClick={() => handlePageChange(number)}
            className={`font-semibold ${number === page ? '' : ''}`}
            variant={number === page ? 'primary' : 'secondary'}
          >
            {number}
          </Button>
        ) : (
          <span className="px-1 text-slate-400" key={randomString()}>
            ...
          </span>
        )
      )}
      {!isShort && (
        <Button
          label="Go to next page"
          size="icon-sm"
          onClick={() => handlePageChange(page + 1)}
          disabled={isLastPage}
          variant="secondary"
        >
          <HiChevronRight className="size-5" />
        </Button>
      )}
    </nav>
  );
};

export default Pagination;
