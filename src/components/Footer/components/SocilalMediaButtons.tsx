import { FC } from 'react';
import { IconType } from 'react-icons';
import { FaFacebook } from 'react-icons/fa6';
import { PiInstagramLogoFill } from 'react-icons/pi';
import { FaTwitter } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { useShop } from '@/hooks';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const SocilalMediaIcons: FC<Props> = ({ className }) => {
  const shopData = useShop().data;
  const socialMedia = shopData?.socialMedia.map((item) => {
    if (item.name === 'facebook') {
      return { title: 'Facebook', url: item.link, IconComponent: FaFacebook };
    }

    if (item.name === 'instagram') {
      return { title: 'Instagram', url: item.link, IconComponent: PiInstagramLogoFill };
    }

    if (item.name === 'twitter') {
      return { title: 'Twitter', url: item.link, IconComponent: FaTwitter };
    }

    return null;
  }) as { title: string; url: string; IconComponent: IconType }[];

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {socialMedia?.map(({ title, url, IconComponent }) => (
        <Button
          key={title}
          label={title}
          variant="secondary"
          size="icon-lg"
          shape="pill"
          href={url}
          className="p-2  text-secondary-700 hover:bg-primary-400 hover:text-white hover:shadow"
        >
          <IconComponent className="size-6" />
        </Button>
      ))}
    </div>
  );
};

export default SocilalMediaIcons;
