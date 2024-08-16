import { FC } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineTrash } from 'react-icons/hi2';
import { ImageComponent } from '@/components';
import { CountInput, Button } from '@/components/ui';
import { CartItemType } from '@/types';
import { useCartItem } from '@/hooks';
import { routesList } from '@/data';

const ProductRow: FC<{ item: CartItemType }> = ({ item }) => {
  const { countInput, removeCartItem, productPrice, totalPrice, currency, selectedOptionString } =
    useCartItem(item);

  return (
    <tr className="rounded border-t">
      <td className="p-4">
        <div className="size-[100px] min-w-[100px] overflow-hidden rounded border bg-white">
          <Link to={`${routesList.product.path}/${item.id}`}>
            <ImageComponent
              className="size-full object-cover"
              src={item.mainImage?.formats.thumbnail.url}
              alt="product"
            />
          </Link>
        </div>
      </td>
      <td className="p-4">
        <Link
          className="line-clamp-2 break-all font-bold transition-colors duration-200 hover:text-primary-400"
          to={`${routesList.product.path}/${item.id}`}
        >
          {item.name}
        </Link>
        <small>{selectedOptionString}</small>
      </td>
      <td className="p-4">
        <CountInput
          value={item.quantity}
          label="Quantity"
          onChange={(e) => countInput.handleChange(e)}
          onClickUp={() => countInput.handleIncrement()}
          onClickDown={() => countInput.handleDecrement()}
        />
      </td>
      <td className="p-4">
        <span className="font-bold text-primary-400">{`${currency} ${productPrice.toFixed(2)} `}</span>
      </td>

      <td className="p-4">
        <span className="font-bold text-primary-400">{`${currency} ${totalPrice.toFixed(2)}`}</span>
      </td>
      <td className="p-4">
        <Button
          label="Remove"
          variant="secondary"
          size="icon-lg"
          onClick={() => removeCartItem(item.id)}
        >
          <HiOutlineTrash className="size-6" />
        </Button>
      </td>
    </tr>
  );
};

export default ProductRow;
