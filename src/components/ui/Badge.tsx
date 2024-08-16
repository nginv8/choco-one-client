import { FC } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';

type Props = VariantProps<typeof badgeVariants> & {
  text: string;
  className?: string;
};

const badgeVariants = cva(
  'pointer-events-none absolute bottom-0 right-0 inline-flex min-h-[18px] min-w-[18px] translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full text-xs text-white shadow transition-all duration-300 group-hover:bg-white group-hover:shadow-md',
  {
    variants: {
      color: {
        primary: 'bg-primary-400 group-hover:text-primary-400',
        secondary: 'text-secondary-600 group-hover:text-secondary-600',
        error: 'bg-red-600 group-hover:text-red-600',
        info: 'bg-blue-600 group-hover:text-blue-600',
        success: 'bg-green-600 group-hover:text-green-600',
        warning: 'bg-yellow-600 group-hover:text-yellow-600',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

const Badge: FC<Props> = ({ text, color, className }) => {
  return <span className={cn(badgeVariants({ color }), className)}>{text}</span>;
};

export default Badge;
