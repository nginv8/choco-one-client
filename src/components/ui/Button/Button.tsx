import { FC } from 'react';
import { VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';
import { buttonVariants } from '@/components/ui';

type Props = VariantProps<typeof buttonVariants> & {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children?: React.ReactNode;

  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';

  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const Button: FC<Props> = ({
  className,
  size,
  variant,
  shape,

  label,
  children,
  onClick,
  href,
  target = '_blank',
  type = 'button',
  disabled = false,
}) =>
  href ? (
    <a
      href={href}
      className={cn(buttonVariants({ variant, size, shape }), className)}
      target={target}
      title={label}
    >
      {children}
    </a>
  ) : (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, shape }), className)}
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
    >
      {children}
    </button>
  );
export default Button;
