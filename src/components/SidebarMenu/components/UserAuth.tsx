import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { PiSignIn } from 'react-icons/pi';
import { CgAddR } from 'react-icons/cg';
import { routesList } from '@/data';
import { useAuth } from '@/hooks';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const UserAuth: FC<Props> = ({ className }) => {
  const user = useAuth().data;

  return user?.name || user?.email ? (
    <div className={cn('flex items-center justify-between p-4', className)}>
      <Link
        to={routesList.account.path}
        className="flex items-center gap-1 transition-colors hover:text-primary-400"
      >
        <FaUserCircle className="pointer-events-none me-1 size-6 text-primary-400" />
        <span className="pointer-events-none inline-block max-w-48 truncate">
          {user.name || user.email}
        </span>
      </Link>
    </div>
  ) : (
    <div className={cn('flex justify-center gap-x-3 p-4', className)}>
      <Link
        to={routesList.signUp.path}
        className="flex items-center transition-colors duration-200 hover:text-primary-400"
      >
        <CgAddR className="pointer-events-none me-1.5 size-4" />
        <span className="pointer-events-none">{routesList.signUp.title}</span>
      </Link>

      <span className="inline-block h-full w-px bg-secondary-700/25" />

      <Link
        className="flex items-center transition-colors duration-200 hover:text-primary-400"
        to={routesList.signIn.path}
      >
        <PiSignIn className="pointer-events-none me-1.5 size-4" />
        <span className="pointer-events-none">{routesList.signIn.title}</span>
      </Link>
    </div>
  );
};

export default UserAuth;
