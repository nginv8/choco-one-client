import { FC, useState } from 'react';
import { MdImageNotSupported } from 'react-icons/md';
import { ImageSkeleton } from '@/components/skeletons';
import { cn } from '@/utils';

type Props = {
  src?: string;
  alt?: string;
  width?: string;
  heigth?: string;
  className?: string;
};

const ImageComponent: FC<Props> = ({ src, alt, width, heigth, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {src && !imageLoaded && (
        <ImageSkeleton
          className={cn(`transition-all delay-200 ${!imageLoaded ? 'flex' : 'hidden'}`, className)}
        />
      )}

      {src ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={heigth}
          className={cn(
            `transition-all duration-200 ${imageLoaded ? 'block' : 'hidden'}`,
            className
          )}
          onLoad={() => setImageLoaded(true)}
        />
      ) : (
        <div
          className={cn(
            'z-0 flex items-center justify-center bg-gray-200 overflow-hidden',
            className
          )}
        >
          <MdImageNotSupported className="aspect-square size-1/3 max-h-32 min-h-6 min-w-6 max-w-32 text-gray-300" />
        </div>
      )}
    </>
  );
};

export default ImageComponent;
