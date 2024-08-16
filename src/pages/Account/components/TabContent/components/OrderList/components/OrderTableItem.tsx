import { FC } from 'react';
import { OrderListItemType } from '@/types';

type Props = OrderListItemType & {
  onOrderOpen: (id: number) => void;
};

const OrderTableItem: FC<Props> = ({ id, date, status, totalPrice, onOrderOpen }) => {
  return (
    <tr key={id} className="rounded border-y bg-white first:border-t-0 last:border-b-0">
      <td className="p-4">
        <span>#{id}</span>
      </td>
      <td className="p-4">
        <span>{date}</span>
      </td>
      <td className="p-4">
        <span
          className={`font-bold ${status === 'Processing' || status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}
        >
          {status}
        </span>
      </td>
      <td className="p-4">
        <span className="font-bold">{totalPrice}</span>
      </td>
      <td className="p-4">
        <button onClick={() => onOrderOpen(id)} className="text-primary-400 hover:underline">
          View
        </button>
      </td>
    </tr>
  );
};

export default OrderTableItem;
