import { useMemo } from 'react';
import useBoundStore from '@/store/useBoundStore';
import { convertCurrencySign, toDecimal, decimalToNumber } from '@/utils';
import { CartItemType } from '@/types';
import useShop from './useShop';
import useAlert from './useAlert';

type CartSummaryType = {
  taxes: { name: string; type: string; value: number; price: number }[];
  subTotal: number | null;
  delivery: number | null;
  grandTotal: number | null;
  currencySign: string | null;
  currencyCode: string | null;
  error: string | null;
};

const useCartSummary = (): CartSummaryType => {
  const { data } = useShop();
  const { showErrorAlert } = useAlert();
  const cartItems = Object.values(useBoundStore((state) => state.cartItems));
  const deliveryPrice = useBoundStore((state) => state.cartSummary.deliveryPrice);
  const currencySign = data?.currency ? convertCurrencySign(data?.currency) : '';

  const validateCurrencies = (items: CartItemType[]) => {
    const currencies = new Set(items.map((item) => item.currency));
    return currencies.size <= 1;
  };

  const isCurrencyValid = useMemo(() => validateCurrencies(cartItems), [cartItems]);

  const calculateOptionsPrice = (options: CartItemType['optionSets'] | null) => {
    if (!options) return toDecimal(0);
    return options.reduce((total, set) => {
      const selectedOption = set.options.find((option) => option.selected);
      return total.plus(toDecimal(selectedOption ? selectedOption.price : 0));
    }, toDecimal(0));
  };

  const subTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const optionsPrice = calculateOptionsPrice(item.optionSets);
      const productPrice = toDecimal(item.price).plus(optionsPrice);
      const total = productPrice.times(toDecimal(item.quantity));
      return acc.plus(total);
    }, toDecimal(0));
  }, [cartItems]);

  const orderTaxes = useMemo(() => {
    return data?.taxes.map((tax) => {
      let price = tax.value;
      if (tax.type === 'percent') {
        price = decimalToNumber(subTotal.times(toDecimal(tax.value).div(toDecimal(100))));
      }
      return { ...tax, price };
    });
  }, [data, subTotal]);

  const totalPrice = useMemo(() => {
    return orderTaxes?.reduce((acc, tax) => {
      return acc.plus(toDecimal(tax.price));
    }, subTotal);
  }, [orderTaxes, subTotal]);

  const grandTotal = useMemo(() => {
    return totalPrice?.plus(toDecimal(deliveryPrice));
  }, [totalPrice, deliveryPrice]);

  const summary: CartSummaryType = {
    taxes: orderTaxes || [],
    subTotal: decimalToNumber(subTotal) || null,
    delivery: decimalToNumber(toDecimal(deliveryPrice)) || null,
    grandTotal: grandTotal ? decimalToNumber(grandTotal) : null,
    currencyCode: data?.currency || null,
    currencySign: currencySign || null,
    error: null,
  };

  if (!isCurrencyValid) {
    summary.error = 'Multiple currencies in cart';
    showErrorAlert('Multiple currencies in cart', 'Please remove items with different currencies.');
  }

  return summary;
};

export default useCartSummary;
