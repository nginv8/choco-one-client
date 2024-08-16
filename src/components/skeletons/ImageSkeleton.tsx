import { FC } from 'react';
import { FaImage } from 'react-icons/fa6';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const ImageSkeleton: FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'z-0 animate-pulse flex items-center justify-center bg-gray-200 overflow-hidden',
        className
      )}
    >
      <FaImage className="aspect-square size-1/3 max-h-24 min-h-6 min-w-6 max-w-24 text-gray-300" />
    </div>
  );
};

export default ImageSkeleton;
