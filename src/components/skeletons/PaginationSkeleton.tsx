import { FC } from 'react';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const PaginationSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex w-full items-center justify-center space-x-2', className)}>
      <div className="size-8 animate-pulse rounded bg-gray-200" />
      <div className="size-8 animate-pulse rounded bg-gray-200" />
      <div className="size-8 animate-pulse rounded bg-gray-200" />
    </div>
  );
};

export default PaginationSkeleton;
