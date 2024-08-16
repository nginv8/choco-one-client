import { IconType } from 'react-icons';
import { TbBrandFacebook } from 'react-icons/tb';
import { RxInstagramLogo } from 'react-icons/rx';
import { TfiTwitter } from 'react-icons/tfi';
import { useShop } from '@/hooks';

const SocilalMediaIcons = () => {
  const { data: shopData, isLoading, isFetching } = useShop();
  const socialMedia = shopData?.socialMedia.map((item) => {
    if (item.name === 'facebook') {
      return { title: 'Facebook', url: item.link, IconComponent: TbBrandFacebook };
    }

    if (item.name === 'instagram') {
      return { title: 'Instagram', url: item.link, IconComponent: RxInstagramLogo };
    }

    if (item.name === 'twitter') {
      return { title: 'Twitter', url: item.link, IconComponent: TfiTwitter };
    }

    return null;
  }) as { title: string; url: string; IconComponent: IconType }[];

  return (
    <>
      {(isLoading || isFetching) && (
        <div className="relative flex items-center gap-2 after:absolute after:right-[-10px] after:hidden after:h-full after:w-px after:bg-gray-700/25 after:content-[''] lg:after:flex">
          <span className="size-4 animate-pulse rounded-full bg-gray-300 text-base" />
          <span className="size-4 animate-pulse rounded-full bg-gray-300 text-base" />
          <span className="size-4 animate-pulse rounded-full bg-gray-300 text-base" />
        </div>
      )}

      {socialMedia?.length > 0 && (
        <div className="relative flex items-center gap-2 after:absolute after:right-[-10px] after:hidden after:h-full after:w-px after:bg-gray-700/25 after:content-[''] lg:after:flex">
          {socialMedia.map(({ title, url, IconComponent }) => (
            <a
              key={title}
              aria-label={title}
              className="flex text-zinc-500 transition-all duration-300 hover:text-primary-400"
              href={url}
            >
              <IconComponent className=" flex text-base" />
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default SocilalMediaIcons;
