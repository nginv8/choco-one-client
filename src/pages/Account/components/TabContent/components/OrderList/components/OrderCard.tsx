import { FC } from 'react';
import { OrderListItemType } from '@/types';

type Props = OrderListItemType & {
  onOrderOpen: (id: number) => void;
};

const OrderCardList: FC<Props> = ({ id, date, status, totalPrice, onOrderOpen }) => {
  return (
    <div className="my-2 rounded-lg border bg-white p-5 lg:hidden">
      <div className="flex flex-wrap items-center justify-between border-b p-2">
        <span className="font-bold">Order:</span>
        <span>#{id}</span>
      </div>
      <div className="flex flex-wrap items-center justify-between border-b p-2">
        <span className="font-bold">Date:</span>
        <span>{date}</span>
      </div>
      <div className="flex flex-wrap items-center justify-between border-b p-2">
        <span className="font-bold">Status:</span>
        <span
          className={`font-bold ${status === 'Processing' || status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}
        >
          {status}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between border-b p-2">
        <span className="font-bold">Total:</span>
        <span className="font-bold">{totalPrice}</span>
      </div>
      <div className="flex items-center justify-center p-2">
        <button onClick={() => onOrderOpen(id)} className="text-primary-400 hover:underline">
          View
        </button>
      </div>
    </div>
  );
};

export default OrderCardList;
