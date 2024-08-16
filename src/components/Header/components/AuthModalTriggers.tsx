import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { routesList } from '@/data';
import { useAuth } from '@/hooks';
import { AuthModal } from '@/components';

const AuthModalTriggers = () => {
  const user = useAuth().data;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="relative hidden lg:flex">
      {user?.name || user?.email ? (
        <Link
          to={routesList.account.path}
          className="flex items-center gap-1  transition-colors hover:text-primary-400"
        >
          <FaUserCircle className="pointer-events-none size-5 text-primary-400" />
          <span className="pointer-events-none">{user.name || user.email}</span>
        </Link>
      ) : (
        <button
          className="flex items-center gap-1 ps-2 text-gray-400 transition-colors hover:text-primary-400"
          onClick={() => setIsAuthModalOpen(true)}
          aria-label="Sign in"
        >
          <FaUserCircle className="pointer-events-none size-5" />
        </button>
      )}

      <AuthModal isAuthModalOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default AuthModalTriggers;
