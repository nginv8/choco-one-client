import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useBoundStore from '@/store/useBoundStore';

const useNavigationEffect = () => {
  const { pathname } = useLocation();
  const isSidebarOpen = useBoundStore((state) => state.isSidebarOpen);
  const closeSidebar = useBoundStore((state) => state.closeSidebar);

  useEffect(() => {
    if (isSidebarOpen) closeSidebar();
    window.scrollTo(0, 0);
  }, [pathname]);
};

export default useNavigationEffect;
