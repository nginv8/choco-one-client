import { Link } from 'react-router-dom';
import { FC, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AddToCartButton, ToggleFavoriteButton, ImageComponent } from '@/components';
import { convertCurrencySign, toDecimal, decimalToNumber } from '@/utils';
import { useProductOptions } from '@/hooks';
import { ProductType } from '@/types';
import useBoundStore from '@/store/useBoundStore';
import { routesList } from '@/data';

type Props = {
  product: ProductType;
};

const ProductCard: FC<Props> = ({ product }) => {
  const { name, id, currency, price, oldPrice, discount, mainImage, shortDescription, optionSets } =
    product;

  const { optionsPrice } = useProductOptions(optionSets);
  const addCartItem = useBoundStore((state) => state.addCartItem);
  const currencySign = convertCurrencySign(currency);

  const productPrice = useMemo(
    () => decimalToNumber(toDecimal(price).plus(toDecimal(optionsPrice))),
    [price, optionsPrice]
  );
  const oldPriceWithOption = useMemo(
    () => (oldPrice ? decimalToNumber(toDecimal(oldPrice).plus(toDecimal(optionsPrice))) : null),
    [oldPrice, optionsPrice]
  );

  return (
    <motion.div
      className="relative flex flex-col overflow-hidden rounded bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {discount && (
        <div className="absolute left-0 top-0 z-10 rounded-br bg-primary-400 px-3 py-2 uppercase text-white">
          <span>{`${discount}% OFF`}</span>
        </div>
      )}

      <ToggleFavoriteButton productId={id} />

      <div className="h-64 w-full">
        <Link to={`${routesList.product.path}/${id}`}>
          <ImageComponent
            src={mainImage?.formats.medium.url}
            className="aspect-square size-full object-cover"
            alt="Product image"
          />
        </Link>
      </div>

      <div className="flex h-full flex-col gap-2 p-4 ">
        <Link
          to={`${routesList.product.path}/${id}`}
          className="line-clamp-1 text-xl font-semibold transition-all duration-300 hover:text-primary-400"
        >
          {name}
        </Link>

        <p className="line-clamp-3 text-gray-400">{shortDescription}</p>
        <div className="mt-auto flex items-center gap-2">
          <span className="text-2xl font-bold text-primary-400">{`${currencySign} ${productPrice}`}</span>

          {oldPrice && (
            <span className=" line-through">{`${currencySign} ${oldPriceWithOption}`}</span>
          )}
        </div>
        <AddToCartButton
          className="uppercase"
          productId={id}
          onClick={() => addCartItem({ ...product, quantity: 1 })}
          label="Add to Shopping Cart"
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;
