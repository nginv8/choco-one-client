import { FC, ReactNode } from 'react';
import { cn } from '@/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

const SectionTitle: FC<Props> = ({ className, children }) => (
  <div
    className={cn(
      'relative flex justify-center pb-3 md:pb-4 text-center text-2xl md:text-3xl font-bold capitalize after:absolute after:bottom-0 after:h-1 after:w-32 md:after:w-40 after:rounded-full after:bg-primary-400',
      className
    )}
  >
    <span>{children}</span>
  </div>
);

export default SectionTitle;
