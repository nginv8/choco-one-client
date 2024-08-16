import { useEffect, useMemo } from 'react';
import { useCountInput, useProductOptions } from '@/hooks/';
import useBoundStore from '@/store/useBoundStore';
import { CartItemType } from '@/types';
import { convertCurrencySign, toDecimal, decimalToNumber } from '@/utils';

const useCartItem = (item: CartItemType) => {
  const { optionsPrice } = useProductOptions(item.optionSets);
  const countInput = useCountInput(item.quantity, 1, 999);

  const removeCartItem = useBoundStore((state) => state.removeCartItem);
  const addCartItem = useBoundStore((state) => state.addCartItem);

  const currency = useMemo(() => convertCurrencySign(item.currency), [item.currency]);

  const productPrice = useMemo(() => {
    return decimalToNumber(toDecimal(item.price).plus(toDecimal(optionsPrice)));
  }, [item.price, optionsPrice]);

  const totalPrice = useMemo(() => {
    return decimalToNumber(toDecimal(productPrice).times(toDecimal(countInput.value)));
  }, [productPrice, countInput.value]);

  const selectedOptionString = useMemo(() => {
    return item.optionSets
      ?.map((optionSet) => {
        const selectedOption = optionSet.options.find((option) => option.selected);
        return `${optionSet.title}: ${selectedOption?.name}`;
      })
      .join(' | ');
  }, [item.optionSets]);

  useEffect(() => {
    addCartItem({ ...item, quantity: countInput.value });
  }, [countInput.value]);

  return { countInput, removeCartItem, productPrice, totalPrice, currency, selectedOptionString };
};

export default useCartItem;
