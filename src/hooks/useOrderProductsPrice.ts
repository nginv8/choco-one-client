import { useMemo } from 'react';
import { ReceivedOrderProductType } from '@/types';
import { decimalToNumber, toDecimal } from '@/utils';

const useOrderProductsPrice = (products: ReceivedOrderProductType[]) =>
  useMemo(
    () =>
      products.map((product) => {
        const singleProductPrice = product.selectedOptions.reduce(
          (acc, option) => toDecimal(acc).plus(toDecimal(option.optionPrice)),
          toDecimal(product.price)
        );

        const totalProductPrice = singleProductPrice.times(product.quantity);

        return {
          ...product,
          singleProductPrice: decimalToNumber(singleProductPrice),
          totalProductPrice: decimalToNumber(totalProductPrice),
        };
      }),
    [products]
  );

export default useOrderProductsPrice;
