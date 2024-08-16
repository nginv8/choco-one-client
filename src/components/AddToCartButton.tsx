import { ComponentProps, FC } from 'react';
import { VariantProps } from 'class-variance-authority';
import { BsBagPlus, BsBagCheck } from 'react-icons/bs';
import { Button, buttonVariants } from './ui';
import useBoundStore from '@/store/useBoundStore';
import { routesList } from '@/data';
import { ProductType } from '@/types';
import { LinkButton } from '@/components';

type Props = VariantProps<typeof buttonVariants> &
  ComponentProps<typeof Button> & {
    productId: ProductType['id'];
    addedVariant?: 'primary' | 'outline' | 'secondary';
    onLinkClick?: () => void;
  };

const AddToCartButton: FC<Props> = ({
  productId,
  onClick,
  onLinkClick,
  label,
  variant = 'primary',
  addedVariant = 'secondary',
  className,
  size,
  shape,
  type,
}) => {
  const isItemInCart = useBoundStore((state) => state.isItemInCart(productId));

  return isItemInCart ? (
    <LinkButton
      className={className}
      onLinkClick={onLinkClick}
      size={size}
      variant={addedVariant}
      shape={shape}
      to={routesList.shoppingCart.path}
    >
      <BsBagCheck className="me-1 size-5" />
      <span>In your Cart</span>
    </LinkButton>
  ) : (
    <Button
      label={label}
      onClick={onClick}
      className={className}
      size={size}
      variant={variant}
      shape={shape}
      type={type}
    >
      <BsBagPlus className="me-1 size-5" />
      <span>Add to Cart</span>
    </Button>
  );
};

export default AddToCartButton;
