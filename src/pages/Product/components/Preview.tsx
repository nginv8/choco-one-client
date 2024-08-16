import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { ToggleFavoriteButton, SliderPrevNextBtns, ImageComponent } from '@/components';
import { ImageType } from '@/types';
import { randomString, cn } from '@/utils';

import 'swiper/css';
import 'swiper/css/scrollbar';
import '@/assets/style/swiperCustom.css';

type Props = {
  className?: string;
  images?: ImageType[] | null;
  slidesPerView?: number;
  thumbsPerView?: number;
};

const ProductPreview: FC<Props> = ({ className, images, slidesPerView = 1, thumbsPerView = 4 }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const productId = parseInt(useParams()?.productId || '', 10);
  const swBtnCls = {
    main: {
      prev: 'sw-main-preview-btn-prev',
      next: 'sw-main-preview-btn-next',
    },
    thumb: {
      prev: 'sw-thumb-preview-btn-prev',
      next: 'sw-thumb-preview-btn-next',
    },
  };

  const filteredImages = images?.filter(
    (img, index, self) => index === self.findIndex((t) => t.url === img.url)
  );

  return !filteredImages || !filteredImages.length ? (
    <div className={cn('min-w-60', className)}>
      <ImageComponent className="aspect-square w-full rounded" />
    </div>
  ) : (
    <div className={cn('min-w-60', className)}>
      <div className="group/slider relative">
        <Swiper
          modules={[Thumbs, Navigation, Scrollbar, A11y]}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation={{
            nextEl: `.${swBtnCls.main.next}`,
            prevEl: `.${swBtnCls.main.prev}`,
          }}
          slidesPerView={slidesPerView}
          zoom
          spaceBetween={10}
          className="h-full"
        >
          <ToggleFavoriteButton productId={productId} />

          {filteredImages.length > slidesPerView && (
            <SliderPrevNextBtns prevBtnCls={swBtnCls.main.prev} nextBtnCls={swBtnCls.main.next} />
          )}

          {filteredImages.map((img) => (
            <SwiperSlide key={`slide-${randomString()}`} className="overflow-hidden rounded">
              <ImageComponent
                src={img.formats.large.url}
                alt={img.alternativeText || img.name}
                className="aspect-square size-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        modules={[FreeMode, Thumbs, Navigation, Pagination, Scrollbar, A11y]}
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={thumbsPerView}
        slidesPerGroup={thumbsPerView}
        navigation={{
          nextEl: `.${swBtnCls.thumb.next}`,
          prevEl: `.${swBtnCls.thumb.prev}`,
        }}
        scrollbar={{
          draggable: true,
          hide: true,
        }}
        className="group/slider thumb-swiper relative overflow-y-visible"
      >
        {filteredImages.length > thumbsPerView && (
          <SliderPrevNextBtns prevBtnCls={swBtnCls.thumb.prev} nextBtnCls={swBtnCls.thumb.next} />
        )}

        {filteredImages.map((img) => (
          <SwiperSlide key={img.url} className="overflow-hidden rounded">
            <ImageComponent
              src={img.formats.thumbnail.url}
              alt={img.alternativeText || img.name}
              className="aspect-square w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductPreview;
