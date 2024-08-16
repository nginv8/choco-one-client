import { FC } from 'react';
import { Link } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import { Badge } from '@/components/ui';
import useBoundStore from '@/store/useBoundStore';
import { routesList } from '@/data';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const GoToCartButton: FC<Props> = ({ className }) => {
  const itemsQuantity = useBoundStore((state) => state.cartItemsQuantity);

  return (
    <Link
      to={routesList.shoppingCart.path}
      className={cn('group relative inline-block', className)}
    >
      <BsBag className="size-8 transition-all duration-300 hover:text-primary-400" />
      {itemsQuantity > 0 && <Badge text={itemsQuantity.toString()} />}
    </Link>
  );
};

export default GoToCartButton;
