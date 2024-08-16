import { useEffect } from 'react';
import useBoundStore from '@/store/useBoundStore';
import { routesList } from '@/data';
import { LoadingIndicator, SectionTitle } from '@/components/ui';
import { LinkButton } from '@/components';

import OrderItems from './components/OrderItems/OrderItems';
import OrderForm from './components/OrderForm';
import OrderCompleted from './components/OrderCompleted';
import OrderFailed from './components/OrderFailed';
import Summary from './components/Summary';

import { useShop } from '@/hooks';

function Cart() {
  const cartStep = useBoundStore((state) => state.cartStep);
  const cartItemsQuantity = useBoundStore((state) => state.cartItemsQuantity);
  const resetCartStep = useBoundStore((state) => state.resetCartStep);
  const shopData = useShop().data;

  useEffect(() => {
    resetCartStep();
  }, [resetCartStep]);

  return (
    <>
      <SectionTitle>Shopping Cart</SectionTitle>

      {!shopData ? (
        <LoadingIndicator variant="info" />
      ) : (
        <>
          {cartItemsQuantity === 0 && cartStep === 'cart' && (
            <div className="flex min-h-72 flex-col items-center justify-center gap-2 text-center">
              <p className="text-2xl text-gray-400">
                You don&apos;t have any items in your cart yet.
              </p>
              <p className="text-gray-600">Do you want to return to the store?</p>

              <LinkButton size="button-md" to={routesList.home.path} className="mt-2">
                Go Back Home
              </LinkButton>
            </div>
          )}

          {cartItemsQuantity > 0 && (
            <div className="grid grid-cols-12 gap-5">
              {cartStep === 'cart' && <OrderItems />}
              {cartStep === 'checkout' && <OrderForm />}
              <Summary />
            </div>
          )}

          {cartStep === 'order success' && (
            <div className="flex flex-col items-center gap-2 text-center">
              <OrderCompleted />
            </div>
          )}

          {cartStep === 'order failure' && (
            <div className="flex flex-col items-center gap-2 text-center">
              <OrderFailed />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Cart;
