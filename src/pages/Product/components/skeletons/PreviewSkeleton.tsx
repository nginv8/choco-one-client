import { FC } from 'react';
import { ImageSkeleton } from '@/components';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const PreviewSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn('min-w-60', className)}>
      <ImageSkeleton className="aspect-square w-full rounded" />

      <div className="grid grid-flow-row grid-cols-4 gap-3 overflow-y-visible py-3">
        <ImageSkeleton className="aspect-square w-full overflow-hidden rounded" />
        <ImageSkeleton className="aspect-square w-full overflow-hidden rounded" />
        <ImageSkeleton className="aspect-square w-full overflow-hidden rounded" />
        <ImageSkeleton className="aspect-square w-full overflow-hidden rounded" />
      </div>
    </div>
  );
};

export default PreviewSkeleton;
