import { FC } from 'react';
import { Link } from 'react-router-dom';
import { HiMiniChevronRight } from 'react-icons/hi2';

import { SiteLogo } from '@/components';
import { useShop } from '@/hooks';
import { footerMenu } from '@/data';
import { cn } from '@/utils';

import SubscribeForm from './components/SubscribeForm';
import SocilalMediaButtons from './components/SocilalMediaButtons';
import ContactInformation from './components/ContactInformation';

type Props = {
  className?: string;
};

const Footer: FC<Props> = ({ className }) => {
  const shopData = useShop().data;

  return (
    <footer className="mt-auto bg-secondary-100 text-secondary-700">
      <div className={cn('grid gap-x-4 gap-y-10 lg:gap-x-10 py-5 lg:py-8', className)}>
        <div className="col-span-12 flex flex-col gap-2 sm:col-span-6 lg:col-span-4">
          <div className="mb-4">
            <SiteLogo />
          </div>
          <ContactInformation />
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <h6 className="pb-2 font-extrabold">Menu</h6>
          <ul className="flex flex-col flex-wrap gap-2 text-sm sm:max-h-[200px]">
            {footerMenu.map((item) => (
              <li
                key={item.title}
                className="group relative flex items-center transition-all duration-300 hover:text-primary-400"
              >
                <span className="absolute -left-6 select-none text-primary-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <HiMiniChevronRight className="size-5" />
                </span>
                <Link to={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
          <SubscribeForm />
          <SocilalMediaButtons />
        </div>
        <p className="col-span-12 text-center text-sm">{shopData?.copyRight || 'Choco-ONE 2022'}</p>
      </div>
    </footer>
  );
};

export default Footer;
