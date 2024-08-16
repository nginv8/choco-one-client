import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Preview from './components/Preview';
import PurchaseForm from './components/PurchaseForm';
import Description from './components/Description';
import PurchaseFormSkeleton from './components/skeletons/PurchaseFormSkeleton';
import PreviewSkeleton from './components/skeletons/PreviewSkeleton';
import { getProductById } from '@/api';
import { dataTransform } from '@/utils';

function Product() {
  const { productId } = useParams();
  const parsedProductId = productId ? parseInt(productId, 10) : null;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: () => parsedProductId && getProductById(parsedProductId),
    staleTime: 10 * 60 * 1000,
  });

  let productData = null;
  let images = [];

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (data) {
    productData = dataTransform.transformProductData(data.data);
    images = [];
    if (productData?.mainImage) images.push(productData.mainImage);
    if (productData?.images) images.push(...productData.images);
  }

  return isPending || isFetching ? (
    <div className="grid grid-cols-12 gap-y-10 md:gap-x-6 lg:gap-x-10">
      <PreviewSkeleton className="col-span-12 md:col-span-6 xl:col-span-5" />
      <PurchaseFormSkeleton className="col-span-12 md:col-span-6 xl:col-span-7" />
    </div>
  ) : (
    productData && (
      <>
        <div className="grid grid-cols-12 gap-y-10 md:gap-x-6 lg:gap-x-8">
          <h1 className="col-span-12 -mb-5 line-clamp-2 block px-2 text-2xl font-bold sm:text-3xl md:sr-only">
            {productData.name}
          </h1>
          <Preview
            images={images}
            slidesPerView={1}
            thumbsPerView={4}
            className="col-span-12 md:col-span-6 xl:col-span-5"
          />
          <PurchaseForm product={productData} className="col-span-12 md:col-span-6 xl:col-span-7" />
        </div>
        <Description longDescriptions={productData.longDescriptions} />
      </>
    )
  );
}

export default Product;
