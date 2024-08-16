import { FC } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import { routesList } from '@/data';
import { LinkButton } from '@/components';

type Props = {
  orderId?: string;
};

const OrderCompleted: FC<Props> = ({ orderId }) => {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="mb-6 mt-4 flex size-32 items-center justify-center rounded-full bg-green-500">
        <BsBagCheckFill className="size-3/5 text-white" />
      </div>
      <span className="text-4xl uppercase text-green-600">Purchase Completed</span>
      <p className="text-lg">
        Your purchase has been successful.
        {orderId && (
          <p>
            Number of your order is
            <span className="font-bold"> # {orderId}</span>.
          </p>
        )}
      </p>
      <p className="text-lg">
        We have sent a confirmation of your purchase to the email address specified when placing the
        order.
      </p>
      <LinkButton to={routesList.home.path} size="button-lg" className="my-4">
        <span>Go Back Home</span>
      </LinkButton>
    </div>
  );
};

export default OrderCompleted;
