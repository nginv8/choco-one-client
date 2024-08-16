import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, SectionTitle } from '@/components/ui';
import { ResetPasswordForm } from '@/components';
import { routesList } from '@/data';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') || '';
  const navigate = useNavigate();
  const goToHome = () => navigate(routesList.home.path);
  const goToSignIn = () => navigate(routesList.signIn.path);

  return (
    <div className="mx-auto w-full max-w-[540px]">
      <SectionTitle className="mb-5">Reset your password</SectionTitle>

      {code && (
        <ResetPasswordForm
          onResetPassword={goToSignIn}
          className="mb-5 rounded-xl bg-white px-5 py-8 shadow-lg md:px-10 md:py-12"
        />
      )}

      {!code && (
        <div className="mb-5 rounded-xl bg-white px-5 py-8 shadow-lg md:px-10 md:py-12 ">
          <p className="mb-4 text-2xl font-semibold">The reset link is invalid</p>
          <p className="mb-6 text-lg text-gray-600">Please try to request a new one.</p>

          <div className="flex justify-center gap-4">
            <Button
              variant="primary"
              size="button-md"
              className="mx-auto flex-auto px-6"
              onClick={goToHome}
              label="Go to home"
            >
              Back to Home
            </Button>
            <Button
              variant="primary"
              size="button-md"
              className="flex-auto px-6"
              onClick={goToSignIn}
              label="Go to login"
            >
              Go to Sign In
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
