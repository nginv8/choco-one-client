import { FC } from 'react';
import { Link } from 'react-router-dom';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { buttonVariants } from '@/components/ui';

type Props = VariantProps<typeof buttonVariants> & {
  onLinkClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  to: string;
};

const LinkButton: FC<Props> = ({ to, className, size, variant, shape, children, onLinkClick }) => (
  <Link
    to={to}
    onClick={onLinkClick}
    className={cn(buttonVariants({ variant, size, shape, className }))}
  >
    {children}
  </Link>
);
export default LinkButton;
