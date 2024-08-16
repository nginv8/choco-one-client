import { useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';

import { Modal, Pagination } from '@/components';
import { LoadingIndicator, SectionTitle } from '@/components/ui';
import { useGetOrders } from '@/hooks';

import OrderModal from './components/OrderModal/OrderModal';
import OrderCard from './components/OrderCard';
import OrderTableItem from './components/OrderTableItem';

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const orderList = useGetOrders(currentPage, 5);

  const [modalSettings, setModalSettings] = useState({
    isOpen: false,
    orderId: null || 0,
    contentLabel: 'Order modal',
  });

  const openOrderModal = (id: number) => {
    setModalSettings({ ...modalSettings, isOpen: true, orderId: id });
  };
  const closeOrderModal = () => {
    setModalSettings({ ...modalSettings, isOpen: false });
  };

  return (
    <>
      <SectionTitle className="mb-8">My Orders</SectionTitle>

      {orderList.isLoading && (
        <div className="my-2 flex min-h-32 items-center justify-center rounded-lg border bg-white p-5">
          <LoadingIndicator variant="info" />
        </div>
      )}

      {orderList.error && (
        <div className="my-2 flex min-h-32 items-center justify-center rounded-lg border bg-white p-5">
          <p className="inline-flex items-center text-gray-400">
            <MdErrorOutline className="me-2 size-5 min-h-5 min-w-5" />
            Something went wrong. We couldn&apos;t load the orders.
          </p>
        </div>
      )}

      {!orderList.isLoading &&
        !orderList.error &&
        orderList.data?.orders &&
        orderList.data?.orders.length === 0 && (
          <div className="my-2 flex min-h-32 items-center justify-center rounded-lg border bg-white p-5">
            <p className=" text-gray-400">You have no orders yet.</p>
          </div>
        )}

      {orderList.data &&
        orderList.data?.orders.length > 0 &&
        orderList.data?.orders.map(({ id, date, status, totalPrice }) => (
          <OrderCard
            key={id}
            id={id}
            date={date}
            status={status}
            totalPrice={totalPrice}
            onOrderOpen={openOrderModal}
          />
        ))}

      {orderList.data?.orders && orderList.data?.orders.length > 0 && (
        <div className="hidden overflow-x-auto rounded-lg border lg:block">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="rounded border-y border-t-0 bg-white p-2 ">
                <th className="p-4">Order</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Total</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderList.data?.orders.map(({ id, date, status, totalPrice }) => (
                <OrderTableItem
                  key={id}
                  id={id}
                  date={date}
                  status={status}
                  totalPrice={totalPrice}
                  onOrderOpen={openOrderModal}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {orderList.data?.orders && orderList.data?.orders.length > 0 && (
        <Pagination
          className="mx-auto mt-5 w-full"
          currentPage={currentPage}
          totalPages={orderList.data?.pagination.pageCount}
          onPageChange={setCurrentPage}
        />
      )}

      <Modal
        isOpen={modalSettings.isOpen !== null && modalSettings.isOpen}
        title={`Order Details - #${modalSettings.orderId}`}
        contentLabel={modalSettings.contentLabel}
        preventScroll
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={closeOrderModal}
      >
        <OrderModal id={modalSettings.orderId} />
      </Modal>
    </>
  );
};

export default OrderList;
