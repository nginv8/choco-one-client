import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { navMenu } from '@/data';
import { cn } from '@/utils';
import useBoundStore from '@/store/useBoundStore';

type Props = {
  className?: string;
};

const NavVertical: FC<Props> = ({ className }) => {
  const location = useLocation();
  const closeSidebar = useBoundStore((state) => state.closeSidebar);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  const navItemClases =
    'block px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-100 border-b border-gray-200';

  const toggleSubmenu = (index: number | null) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const handleLinkClick = (linkPath: string) => {
    if (location.pathname === linkPath) closeSidebar();
  };

  return (
    <nav className={cn('py-4', className)}>
      <ul className="flex flex-col">
        {navMenu.map((navItem, index) => (
          <li key={navItem.title}>
            {'path' in navItem ? (
              <Link
                to={navItem.path}
                className={cn(
                  navItemClases,
                  location.pathname === navItem.path ? 'text-primary-400' : ''
                )}
                onClick={() => handleLinkClick(navItem.path)}
              >
                {navItem.title}
              </Link>
            ) : (
              <div>
                <button
                  onClick={() => toggleSubmenu(index)}
                  className={cn(
                    navItemClases,
                    'flex w-full items-center justify-between focus:outline-none'
                  )}
                >
                  {navItem.title}
                  <HiChevronDown
                    className={`size-5 transition-transform ${openSubmenu === index ? 'rotate-180' : 'rotate-0'}`}
                  />
                </button>
                <AnimatePresence>
                  {openSubmenu === index && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden bg-gray-50"
                    >
                      {navItem.subMenu.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={cn(
                              navItemClases,
                              'pl-8',
                              location.pathname === subItem.path ? 'text-primary-400' : ''
                            )}
                            onClick={() => handleLinkClick(subItem.path)}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavVertical;
