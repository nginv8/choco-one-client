import { FC } from 'react';
import { Link } from 'react-router-dom';
import { routesList } from '@/data';
import { ReceivedOrderProductType } from '@/types';
import { ImageComponent } from '@/components';

type Props = {
  product: ReceivedOrderProductType;
  productPrice: number;
  totalPrice: number;
};

const OrderModalProduct: FC<Props> = ({ product, productPrice, totalPrice }) => {
  return (
    <div key={product.productId} className="my-2 flex gap-5">
      <div className="size-[100px] min-w-[100px] overflow-hidden rounded border bg-white">
        <Link to={`${routesList.product.path}/${product.productId}`}>
          {product.mainImage && (
            <ImageComponent
              className="size-full object-cover"
              src={product.mainImage.url}
              alt="product"
            />
          )}
        </Link>
      </div>

      <div className="flex flex-col flex-wrap gap-1">
        <Link
          className="line-clamp-2 font-semibold"
          to={`${routesList.product.path}/${product.productId}`}
        >
          {product.name}
        </Link>

        <span className="text-xs">
          {product.selectedOptions.map((option, i) => (
            <span key={option.optionName}>
              <span className="text-gray-400">{option.optionSetName}:</span>
              <span className="font-medium"> {option.optionName}</span>
              {i < product.selectedOptions.length - 1 && <span> | </span>}
            </span>
          ))}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xl font-semibold text-primary-400">
            {product.currency} {productPrice}
          </span>
          <span className="text-sm">
            {product.quantity} {product.quantity > 1 ? 'items' : 'item'}
          </span>
        </div>

        <span className="text-sm">
          Total: {product.currency} {totalPrice}
        </span>
      </div>
    </div>
  );
};

export default OrderModalProduct;
