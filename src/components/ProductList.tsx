import { useState } from 'react';
import { Categories, Pagination, ProductCard } from '@/components';
import { ProductCardSkeleton } from '@/components/skeletons';
import { useGetProducts, useProductListPage } from '@/hooks';
import { ProductType } from '@/types';

function ProductList() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const { page, setPage, itemsPerPage } = useProductListPage();
  const { isLoading, error, data } = useGetProducts(page, itemsPerPage, selectedCategories);

  const renderSkeletons = () => {
    const skeletonItemsPerPage = Math.floor(itemsPerPage / 2);
    const skeletonArray = Array.from({ length: skeletonItemsPerPage }, (_, index) => index);
    return skeletonArray.map((index) => <ProductCardSkeleton key={index} />);
  };

  return (
    <section>
      <Categories onSelectedCategoriesChange={(categories) => setSelectedCategories(categories)} />

      {error && (
        <div className="flex h-32 items-center justify-center">
          <p className="text-lg font-medium text-gray-400">
            Something went wrong. We couldn&apos;t load the products.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? renderSkeletons()
          : data?.products?.map((product: ProductType) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>

      <Pagination
        className="mx-auto mt-5 w-full"
        currentPage={data?.pagination.page}
        totalPages={data?.pagination.pageCount}
        onPageChange={setPage}
      />
    </section>
  );
}

export default ProductList;
