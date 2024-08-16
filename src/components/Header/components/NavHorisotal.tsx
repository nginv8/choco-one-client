import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiChevronDown } from 'react-icons/hi2';
import { navMenu } from '@/data';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const NavHorizontal: FC<Props> = ({ className }) => {
  const location = useLocation();

  return (
    <ul
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px] font-bold uppercase tracking-wider',
        className
      )}
    >
      {navMenu.map((item) =>
        'subMenu' in item ? (
          <li className="group relative" key={item.title}>
            <div className="cursor-pointer transition-all duration-300 hover:text-primary-400 group-hover:text-primary-400">
              <div className="flex items-center gap-1 font-bold">
                <span>{item.title}</span>
                <HiChevronDown className="size-4 text-primary-400" />
              </div>
            </div>
            <ul className="invisible absolute z-10 w-[200px] translate-y-4 overflow-hidden border-t-4 border-primary-400 bg-white text-sm opacity-0 shadow transition-all duration-300 group-hover:visible group-hover:block group-hover:translate-y-0 group-hover:opacity-100">
              {item.subMenu.map((subItem) => (
                <li key={subItem.title}>
                  <Link
                    className={cn(
                      'flex p-2 transition-all duration-300 hover:text-primary-400',
                      location.pathname === subItem.path ? 'text-primary-400' : ''
                    )}
                    to={subItem.path}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ) : (
          <li key={item.title}>
            <Link
              className={cn(
                'flex font-bold transition-all duration-300 hover:text-primary-400',
                location.pathname === item.path ? 'text-primary-400' : ''
              )}
              to={item.path}
            >
              <span>{item.title}</span>
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export default NavHorizontal;
