import { FC } from 'react';
import { Link } from 'react-router-dom';
import { GoHeart } from 'react-icons/go';
import { Badge } from '@/components/ui';
import { routesList } from '@/data';
import { cn } from '@/utils';
import { useFavorites } from '@/hooks';

type Props = {
  className?: string;
};

const GoToFavoriteButton: FC<Props> = ({ className }) => {
  const itemsQuantity = useFavorites()?.data?.length || 0;

  return (
    <Link to={routesList.favorite.path} className={cn('group relative inline-block', className)}>
      <GoHeart className="size-8 transition-all duration-300 hover:text-primary-400" />
      {itemsQuantity > 0 && <Badge text={itemsQuantity.toString()} />}
    </Link>
  );
};

export default GoToFavoriteButton;
