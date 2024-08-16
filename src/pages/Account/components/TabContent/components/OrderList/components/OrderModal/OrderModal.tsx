import { FC } from 'react';
import { useGetOrderById, useOrderProductsPrice } from '@/hooks';
import OrderModalProduct from './components/OrderModalProduct';
import { LoadingIndicator } from '@/components/ui';

type Props = {
  id: number;
};

const OrderModal: FC<Props> = ({ id }) => {
  const { isLoading, error, data } = useGetOrderById(id);
  const products = useOrderProductsPrice(data?.products || []);
  const details = [
    {
      title: 'Created at:',
      value: data?.date,
    },
    {
      title: 'Order ID:',
      value: id,
    },
    {
      title: 'Order Status:',
      value: data?.status,
    },
    {
      title: 'Delivery:',
      value: `${data?.delivery} (${data?.currency} ${data?.deliveryPrice})`,
    },
    {
      title: 'Payment:',
      value: data?.payment,
    },
    {
      title: 'Destination:',
      value: data?.address,
    },
    {
      title: 'Comment:',
      value: data?.comment,
    },
  ];

  return (
    <>
      {isLoading && (
        <div className="flex h-96 items-center justify-center">
          <LoadingIndicator variant="info" className="p-5" />
        </div>
      )}

      {error && (
        <div className="flex h-96 items-center justify-center">
          <p className="text-lg font-semibold text-red-500">
            Something went wrong. We couldn&aps;t load the order.
          </p>
        </div>
      )}

      {!data && !isLoading && (
        <div className="flex h-96 items-center justify-center">
          <p className="text-lg font-semibold text-gray-500">No order found.</p>
        </div>
      )}

      {data && (
        <>
          <div className="border-t">
            {details.map(
              (detail) =>
                detail.value && (
                  <div key={detail.title} className="flex justify-between py-2">
                    <span className="me-4 block font-semibold">{detail.title}</span>

                    {detail.title === 'Order Status:' ? (
                      <span
                        className={
                          data.status === 'Processing' || data.status === 'Completed'
                            ? 'font-semibold text-green-600'
                            : 'font-semibold text-red-500'
                        }
                      >
                        {detail.value}
                      </span>
                    ) : (
                      <span>{detail.value}</span>
                    )}
                  </div>
                )
            )}
          </div>

          <div className="border-y py-2">
            {products?.map((product) => (
              <OrderModalProduct
                key={product.productId}
                product={product}
                productPrice={product.singleProductPrice}
                totalPrice={product.totalProductPrice}
              />
            ))}
          </div>

          {data?.comment && (
            <div className="border-b py-2">
              <span className="mb-2 block font-semibold">Comment:</span>
              <span>{data.comment}</span>
            </div>
          )}

          <div className="border-b">
            {data?.taxes.map((tax) => (
              <p key={tax.name} className="inline-flex w-full justify-between py-2">
                <span>{tax.name}: </span>
                <span className="font-semibold">
                  {tax.type === 'percent' ? `${tax.value}%` : `${data.currency} ${tax.value}`}
                </span>
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between pb-2 pt-4 font-semibold">
            <span>Total Cost:</span>
            <span className="text-xl text-primary-400">
              {data.currency} {data.totalPrice}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default OrderModal;
