import { FC } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { Button } from '@/components/ui';

type Props = {
  prevBtnCls: string;
  nextBtnCls: string;
};

const PreviewSliderBtns: FC<Props> = ({ prevBtnCls, nextBtnCls }: Props) => (
  <>
    <Button
      size="icon-md"
      className={`${prevBtnCls} absolute inset-y-1/2 -left-12 z-10 -translate-y-5 group-hover/slider:left-2`}
      label="Previous image"
    >
      <HiChevronLeft className="size-6" />
    </Button>
    <Button
      size="icon-md"
      className={`${nextBtnCls} absolute inset-y-1/2 -right-12 z-10 -translate-y-5 group-hover/slider:right-2`}
      label="Next image"
    >
      <HiChevronRight className="size-6" />
    </Button>
  </>
);

export default PreviewSliderBtns;
