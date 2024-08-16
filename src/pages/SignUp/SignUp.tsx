import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkButton, SignUpForm } from '@/components';
import { routesList } from '@/data';
import { SectionTitle } from '@/components/ui';
import { useAuth } from '@/hooks';

const SignUp = () => {
  const user = useAuth().data;
  const navigate = useNavigate();
  const goToSignIn = () => navigate(routesList.signIn.path);

  useEffect(() => {
    if (user) goToSignIn();
  }, [user]);

  return (
    <div className="mx-auto w-full max-w-[540px]">
      <SectionTitle className="mb-5">Sign up</SectionTitle>
      <SignUpForm className="mb-5 rounded-xl bg-white px-5 py-8 shadow-lg md:px-10 md:py-12" />

      <span className="mb-2 block text-lg font-semibold">Already a customer?</span>
      <span className="mb-5 block">
        Log in to access your account, view order history, and manage your information.
      </span>

      <LinkButton to={routesList.signIn.path} size="button-md" variant="outline">
        {routesList.signIn.title}
      </LinkButton>
    </div>
  );
};

export default SignUp;
