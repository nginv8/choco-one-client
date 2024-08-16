import CardList from './components/CardList/CardList';
import TableList from './components/TableList/TableList';

const OrderItems = () => (
  <>
    {/* mobile */}
    <div className="col-span-12 sm:col-span-7 xl:hidden">
      <CardList />
    </div>

    {/* desktop */}
    <div className="col-span-8 hidden xl:block">
      <TableList />
    </div>
  </>
);
export default OrderItems;
