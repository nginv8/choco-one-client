import ImageSkeleton from '@/components/skeletons/ImageSkeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-lg bg-white">
      <ImageSkeleton className="h-64 min-h-64 w-full rounded-t-lg" />

      <div className="flex h-full flex-col gap-2 p-4">
        <div className="h-6 w-3/4 rounded-lg bg-gray-200" />
        <div className="h-4 w-full rounded-lg bg-gray-200" />
        <div className="h-4 w-5/6 rounded-lg bg-gray-200" />
        <div className="mt-auto flex items-center gap-2">
          <div className="h-8 w-1/2 rounded-lg bg-gray-200" />
          <div className="h-6 w-1/4 rounded-lg bg-gray-200" />
        </div>
        <div className="h-8 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
