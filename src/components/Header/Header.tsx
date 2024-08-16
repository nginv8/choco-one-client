import { FC } from 'react';

import { GoToCartButton, GoToFavoriteButton, SiteLogo, SidebarMenu } from '@/components';
import { useShop, useWindowSize } from '@/hooks';
import { cn } from '@/utils';

import AuthModalTriggers from './components/AuthModalTriggers';
import ContactInformation from './components/ContactInformation';
import SocilalMediaIcons from './components/SocilalMediaIcons';
import NavHorisotal from './components/NavHorisotal';

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  const { data: shopData, isLoading, isFetching } = useShop();
  const windowSize = useWindowSize();

  return (
    <header className="sticky -top-12 z-20 bg-secondary-100 text-secondary-700 shadow-sm lg:-top-14">
      {(windowSize === 'lg' ||
        windowSize === 'xl' ||
        isLoading ||
        isFetching ||
        (shopData?.emails && shopData.emails?.length > 0) ||
        (shopData?.phones && shopData.phones?.length > 0) ||
        (shopData?.socialMedia && shopData.socialMedia.length > 0)) && (
        <div className={className}>
          <div className="flex h-12 items-center justify-between border-b py-3 text-sm lg:h-14 lg:gap-4 lg:py-4">
            <ContactInformation />

            <div className="ml-auto flex gap-5">
              <SocilalMediaIcons />
              <AuthModalTriggers />
            </div>
          </div>
        </div>
      )}

      <div className={cn('sticky top-0 z-10 py-3 lg:gap-4 lg:py-4', className)}>
        <div className="flex items-center justify-between">
          <SiteLogo />
          <NavHorisotal className="hidden lg:flex" />
          <div className="flex h-12 items-center">
            <GoToFavoriteButton className="me-4 hidden md:block" />
            <GoToCartButton className="hidden md:block" />
            <SidebarMenu className="ms-5 lg:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
