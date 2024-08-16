import { BsBagXFill } from 'react-icons/bs';
import { routesList } from '@/data';
import { LinkButton } from '@/components';

const OrderCompleted = () => {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="mb-6 mt-4 flex size-32 items-center justify-center rounded-full bg-red-500">
        <BsBagXFill className="size-3/5 text-white" />
      </div>
      <span className="text-4xl uppercase text-red-600">Purchase Failed</span>
      <p className="text-lg">An error occurred while completing your purchase, please try again.</p>
      <p className="text-lg">
        If you continue to have this problem, contact technical support please.
      </p>
      <LinkButton to={routesList.home.path} size="button-lg" className="my-4">
        <span>Go Back Home</span>
      </LinkButton>
    </div>
  );
};

export default OrderCompleted;
