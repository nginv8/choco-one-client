import { LinkButton, Pagination, ProductCard } from '@/components';
import { ProductCardSkeleton } from '@/components/skeletons';
import { ProductType } from '@/types';
import { useGetProductByIds, useProductListPage, useFavorites } from '@/hooks';
import { routesList } from '@/data';

function ProductList() {
  const { page, setPage, itemsPerPage } = useProductListPage();
  const favorites = useFavorites();
  const { data, error, isLoading } = useGetProductByIds(favorites.data, page, itemsPerPage);

  const renderSkeletons = () => {
    const skeletonItemsPerPage =
      favorites?.data?.length > 0
        ? Math.min(itemsPerPage, favorites.data.length)
        : Math.floor(itemsPerPage / 2);

    const skeletonArray = Array.from({ length: skeletonItemsPerPage }, (_, index) => index);
    return skeletonArray.map((index) => <ProductCardSkeleton key={index} />);
  };

  return (
    <>
      {favorites.data.length === 0 && (
        <div className="flex min-h-72 flex-col items-center justify-center gap-2 text-center">
          <p className="text-2xl text-gray-400">
            You haven&apos;t added any items to your favorites yet.
          </p>
          <p className="text-gray-600">Do you want to return to the store?</p>

          <LinkButton size="button-md" to={routesList.home.path} className="mt-2">
            Go Back Home
          </LinkButton>
        </div>
      )}

      {error && (
        <div className="flex min-h-72 flex-col items-center justify-center gap-2 text-center">
          <p className="text-2xl text-gray-400">
            Something went wrong. We couldn&apos;t load the favorite products.
          </p>
          <p className="text-gray-600">Do you want to return to the store?</p>
          <LinkButton size="button-md" to={routesList.home.path} className="mt-2">
            Go Back Home
          </LinkButton>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && favorites.data.length > 0
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
    </>
  );
}

export default ProductList;
