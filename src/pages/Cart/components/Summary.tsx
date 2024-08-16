import { FC } from 'react';
import { LuRefreshCw } from 'react-icons/lu';
import { Button } from '@/components/ui';
import { useCartSummary } from '@/hooks';
import { LinkButton } from '@/components';
import { routesList } from '@/data';
import useBoundStore from '@/store/useBoundStore';

const Summary: FC = () => {
  const { taxes, delivery, subTotal, grandTotal, currencySign } = useCartSummary();
  const cartStep = useBoundStore((state) => state.cartStep);
  const setCartStep = useBoundStore((state) => state.setCartStep);

  return (
    <div className="relative col-span-12 sm:col-span-5 xl:col-span-4">
      <div className="sticky top-24">
        <div className="relative rounded border border-gray-200 bg-white p-4">
          <span className="mb-6 inline-block text-center text-lg font-bold">
            Summary of your purchase:
          </span>

          <div className="py-4">
            <div className="my-2 flex justify-between">
              <span>Subtotal:</span>
              <span>
                {currencySign} {subTotal}
              </span>
            </div>

            {taxes.map((tax) => (
              <div key={tax.name} className="my-2 flex justify-between">
                <span>{tax.name}: </span>
                <span>
                  {currencySign} {tax.price}
                </span>
              </div>
            ))}

            {delivery && delivery > 0 && (
              <div className="my-2 flex justify-between">
                <span>Delivery:</span>
                <span>
                  {currencySign} {delivery}
                </span>
              </div>
            )}
          </div>

          <div className="flex justify-between border-t-2 border-gray-200 py-4 text-xl font-bold uppercase">
            <span>Total:</span>
            <span>
              {currencySign} {grandTotal}
            </span>
          </div>

          {cartStep === 'cart' && (
            <Button
              label="Continue"
              size="button-md"
              className="w-full"
              onClick={() => setCartStep('checkout')}
            >
              Continue
            </Button>
          )}
        </div>

        <LinkButton
          to={routesList.ourProducts.path}
          className="group mt-4 w-full"
          size="button-md"
          variant="secondary"
        >
          <LuRefreshCw className="size-5 rotate-0 transition-transform duration-300 group-hover:rotate-180" />
          <span>Add more products</span>
        </LinkButton>
      </div>
    </div>
  );
};

export default Summary;
