import { HiMiniShieldCheck } from 'react-icons/hi2';
import { LinkButton } from '@/components';
import { routesList } from '@/data';

const EmailConfirmation = () => {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="mb-6 mt-4 flex size-32 items-center justify-center rounded-full bg-green-500">
        <HiMiniShieldCheck className="size-3/5 text-white" />
      </div>
      <span className="text-4xl uppercase text-green-600">Email confirmed</span>
      <p className="text-lg">Your email has been successfuly confirmed.</p>
      <p className="mb-5 text-lg">Now you can use your account.</p>

      <LinkButton to={routesList.home.path} size="button-md" className="">
        Go to Home
      </LinkButton>
    </div>
  );
};

export default EmailConfirmation;
