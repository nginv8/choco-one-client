import { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3 } from 'react-icons/hi';
import { RiCloseLargeLine } from 'react-icons/ri';

import { Button } from '@/components/ui';
import { SiteLogo, GoToCartButton, GoToFavoriteButton } from '@/components';
import useBoundStore from '@/store/useBoundStore';
import { preventAppScroll } from '@/utils';

import NavVertical from './components/NavVertical';
import UserAuth from './components/UserAuth';

type Props = {
  className?: string;
};

const SidebarMenu: FC<Props> = ({ className }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const isSidebarOpen = useBoundStore((state) => state.isSidebarOpen);
  const openSidebar = useBoundStore((state) => state.openSidebar);
  const closeSidebar = useBoundStore((state) => state.closeSidebar);

  useEffect(() => {
    const modalRoot = document.getElementById('sidebar-portal');
    setContainer(modalRoot);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) preventAppScroll(true);
    return () => preventAppScroll(false);
  }, [isSidebarOpen]);

  if (!container) {
    return null;
  }

  return (
    <div>
      <Button className={className} label="Sidebar menu" size="icon-md" onClick={openSidebar}>
        {isSidebarOpen ? (
          <RiCloseLargeLine className="size-6" />
        ) : (
          <HiMenuAlt3 className="size-6" />
        )}
      </Button>
      {createPortal(
        <>
          <button
            aria-label="close menu"
            className={`fixed inset-0 z-30 bg-gray-800/75 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            onClick={closeSidebar}
          />

          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-40 flex max-h-screen w-64 flex-col overflow-y-auto bg-white shadow-lg"
              >
                <div className="flex justify-between p-4">
                  <SiteLogo className="max-h-7 w-3/4" />
                  <button
                    aria-label="close menu"
                    onClick={closeSidebar}
                    className="text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                  >
                    <RiCloseLargeLine className="size-5" />
                  </button>
                </div>
                <div className="flex justify-end gap-4 p-4">
                  <GoToFavoriteButton />
                  <GoToCartButton />
                </div>
                <NavVertical />
                <UserAuth className="mt-auto" />
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        container
      )}
    </div>
  );
};

export default SidebarMenu;
