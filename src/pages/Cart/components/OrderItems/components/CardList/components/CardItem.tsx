import { FC } from 'react';
import { Link } from 'react-router-dom';

import { RiCloseLargeFill } from 'react-icons/ri';
import { ImageComponent } from '@/components';
import { CountInput } from '@/components/ui';
import { CartItemType } from '@/types';
import { useCartItem } from '@/hooks';
import { routesList } from '@/data';

type Props = {
  item: CartItemType;
};

const ItemCard: FC<Props> = ({ item }) => {
  const { countInput, removeCartItem, productPrice, totalPrice, currency, selectedOptionString } =
    useCartItem(item);

  return (
    <div
      className="relative flex w-full flex-col rounded border bg-white p-5 pt-7 duration-300 ease-out"
      data-id={item.id}
    >
      <button
        onClick={() => removeCartItem(item.id)}
        aria-label="Remove from Cart"
        className="absolute right-0 top-0 p-4 text-black transition-colors duration-300 hover:text-primary-500"
      >
        <RiCloseLargeFill className="size-5" />
      </button>

      <div className="mx-auto size-[150px] min-w-[100px] overflow-hidden rounded bg-white">
        <Link to={`${routesList.product.path}/${item.id}`}>
          <ImageComponent
            className="size-full object-cover"
            src={item.mainImage?.formats.small.url}
            alt="product"
          />
        </Link>
      </div>

      <div className="mt-4">
        <div className="border-y py-2">
          <span className="line-clamp-2 text-center font-bold">{item.name}</span>
          <small className="block text-center">{selectedOptionString}</small>
        </div>

        <div className="flex items-center justify-between gap-1 border-b py-2">
          <span className="font-bold">Price:</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-400">{`${currency} ${productPrice.toFixed(2)}`}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 border-b py-2">
          <span className="font-bold">Quantity:</span>
          <CountInput
            value={item.quantity}
            label="Quantity"
            onChange={(e) => countInput.handleChange(e)}
            onClickUp={() => countInput.handleIncrement()}
            onClickDown={() => countInput.handleDecrement()}
          />
        </div>

        <div className="flex items-center justify-between gap-1 py-2">
          <span className="font-bold">Total:</span>
          <span className="text-xl font-bold text-primary-400">{`${currency} ${totalPrice.toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  );
};
export default ItemCard;
