import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routesList } from '@/data';
import logo from '@/assets/img/logo.svg';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const SiteLogo: FC<Props> = ({ className }) => {
  return (
    <Link to={routesList.home.path} aria-label="Site logo">
      <img className={cn('inline-block max-h-7 lg:max-h-8', className)} src={logo} alt="" />
    </Link>
  );
};

export default SiteLogo;
