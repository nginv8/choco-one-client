import { FC } from 'react';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const PurchaseFormSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn('min-w-60 flex animate-pulse flex-col gap-6', className)}>
      <span className="hidden h-8 w-3/4 rounded-lg bg-gray-300 md:inline-block lg:h-10" />

      <div className=" flex items-end">
        <span className="h-8 w-1/4 rounded-lg bg-gray-300" />
        <span className="ml-3 h-6 w-1/4 rounded-lg bg-gray-300" />
      </div>

      <span className="block h-6 w-1/3 rounded-lg bg-gray-300">
        <span className="ml-2 h-6 w-1/4 rounded-lg bg-gray-300" />
      </span>

      <p className="h-24 w-full rounded-lg bg-gray-300" />

      <div className="flex flex-col gap-3">
        <span className="h-6 w-1/4 rounded-lg bg-gray-300" />
        <ul className="flex flex-wrap gap-4">
          <li className="h-10 w-16 rounded border border-gray-300 bg-gray-300" />
          <li className="h-10 w-14 rounded border border-gray-300 bg-gray-300" />
          <li className="h-10 w-20 rounded border border-gray-300 bg-gray-300" />
        </ul>
      </div>

      <div className="hidden flex-col gap-3 lg:flex">
        <span className="h-6 w-1/4 rounded-lg bg-gray-300" />
        <ul className="flex flex-wrap gap-4">
          <li className="h-10 w-16 rounded border border-gray-300 bg-gray-300" />
          <li className="h-10 w-14 rounded border border-gray-300 bg-gray-300" />
          <li className="h-10 w-20 rounded border border-gray-300 bg-gray-300" />
          <li className="h-10 w-20 rounded border border-gray-300 bg-gray-300" />
          <li className="h-10 w-20 rounded border border-gray-300 bg-gray-300" />
        </ul>
      </div>

      <div className="flex flex-wrap justify-start gap-4">
        <div className="h-12 w-20 rounded-lg bg-gray-300" />
        <div className="h-12 w-32 rounded-lg bg-gray-300" />
      </div>
    </div>
  );
};

export default PurchaseFormSkeleton;
