import useBoundStore from '@/store/useBoundStore';
import TableItem from './components/TableItem';

const TableList = () => {
  const cartItems = useBoundStore((state) => state.cartItems);

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[800px] bg-white text-left">
        <thead>
          <tr>
            <th className="p-4" aria-hidden="true" />
            <th className="p-4">Product Name</th>
            <th className="p-4">Quantity</th>
            <th className="p-4">Unit Price</th>
            <th className="p-4">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(cartItems).map((item) => (
            <TableItem item={item} key={item.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableList;
