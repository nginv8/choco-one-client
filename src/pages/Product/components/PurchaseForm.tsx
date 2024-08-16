import { FC, useMemo } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import { Button, CountInput, RadioButton } from '@/components/ui';
import { AddToCartButton } from '@/components';
import { ProductType } from '@/types';
import useBoundStore from '@/store/useBoundStore';
import { useCountInput, useProductOptions } from '@/hooks';
import { convertCurrencySign, cn, toDecimal, decimalToNumber } from '@/utils';

type Props = {
  product: ProductType;
  className: string;
};

const PurchaseForm: FC<Props> = ({ product, className }) => {
  const { id, name, price, oldPrice, shortDescription, available, currency, optionSets } = product;
  const quantityInput = useCountInput(1, 1, 999);
  const currencySign = convertCurrencySign(currency);

  const { selectedOptions, handleOptionChange, optionsPrice } = useProductOptions(optionSets);
  const addCartItem = useBoundStore((state) => state.addCartItem);
  const removeCartItem = useBoundStore((state) => state.removeCartItem);
  const isItemInCart = useBoundStore((state) => state.isItemInCart(id));

  const productPrice = useMemo(
    () => decimalToNumber(toDecimal(price).plus(toDecimal(optionsPrice))),
    [price, optionsPrice]
  );
  const oldPriceWithOption = useMemo(
    () => (oldPrice ? decimalToNumber(toDecimal(oldPrice).plus(toDecimal(optionsPrice))) : null),
    [oldPrice, optionsPrice]
  );

  const handleAddToCart = () => {
    addCartItem({
      ...product,
      quantity: quantityInput.value,
      optionSets: selectedOptions,
    });
  };

  return (
    <div className={cn('min-w-60', className)}>
      <form className="flex flex-col gap-5">
        <span className="line-clamp-2 hidden text-2xl font-bold md:inline-block lg:text-3xl">
          {name}
        </span>

        <div>
          <span className="text-2xl font-bold text-primary-400">
            {currencySign} {productPrice}
          </span>

          {oldPrice && (
            <span className="ps-3 line-through">
              {currencySign} {oldPriceWithOption}
            </span>
          )}
        </div>

        <span className="inline-block w-full font-bold">
          Stock:
          <span className="font-bold text-primary-400">
            {available ? ' In stock' : ' Out of stock'}
          </span>
        </span>

        <p className="line-clamp-5">{shortDescription}</p>

        {selectedOptions &&
          selectedOptions.map((set, setIndex) => (
            <div key={set.title} className="flex flex-col gap-3">
              <span className="font-bold capitalize">{`${set.title}: `}</span>
              <ul className="flex flex-wrap gap-3">
                {set.options.map((option, optionIndex) => (
                  <li key={`${set.title}-${option.name}`}>
                    <RadioButton
                      name={set.title}
                      id={`${set.title}-${option.name}`}
                      onChange={() => handleOptionChange(setIndex, optionIndex)}
                      checked={option.selected}
                    >
                      {option.name}
                    </RadioButton>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        <div className="flex flex-wrap justify-start gap-4">
          <CountInput
            value={quantityInput.value}
            onChange={quantityInput.handleChange}
            onClickUp={quantityInput.handleIncrement}
            onClickDown={quantityInput.handleDecrement}
          />

          <AddToCartButton
            size="button-md"
            addedVariant="outline"
            label="Buy now"
            productId={id}
            onClick={handleAddToCart}
          />

          {isItemInCart && (
            <Button
              onClick={() => removeCartItem(id)}
              size="icon-lg"
              variant="outline"
              label="Remove item from cart"
            >
              <HiOutlineTrash className="size-6" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;
