import { useState, useEffect } from 'react';

function getWindowSize() {
  const width = window.innerWidth;
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
}

function useWindowSize() {
  const [size, setSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => setSize(getWindowSize());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default useWindowSize;
