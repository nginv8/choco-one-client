import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkButton, SignInForm } from '@/components';
import { routesList } from '@/data';
import { SectionTitle } from '@/components/ui';
import { useAuth } from '@/hooks';

const SignIn = () => {
  const user = useAuth().data;
  const navigate = useNavigate();
  const goToAccount = () => navigate(routesList.account.path);

  useEffect(() => {
    if (user) goToAccount();
  }, [user]);

  return (
    <div className="mx-auto w-full max-w-[540px]">
      <SectionTitle className="mb-5">Sign In</SectionTitle>
      <SignInForm className="mb-5 rounded-xl bg-white px-5 py-8 shadow-lg md:px-10 md:py-12" />

      <span className="mb-2 block text-lg font-semibold">New customer?</span>
      <span className="mb-6 block">
        Sign up for an account to take advantage of order history as well as pre-filled forms during
        checkout on subsequent orders.
      </span>

      <LinkButton to={routesList.signUp.path} size="button-md" variant="outline">
        {routesList.signUp.title}
      </LinkButton>
    </div>
  );
};

export default SignIn;
