import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import getPageByName from '@/api/page';
import { dataTransform } from '@/utils';
import { PageDataType, RawPageData } from '@/types';

type PageName = 'about-us' | 'delivery' | 'privacy-policy' | 'terms-and-conditions';

const useDynamicPage = (pageName: PageName) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['page', pageName],
    queryFn: () => getPageByName(pageName),
    select: useCallback((rawData: RawPageData): PageDataType => {
      const pageData = dataTransform.transformPageData(rawData);
      return pageData;
    }, []),
    staleTime: 10 * 60 * 1000,
  });

  return { isLoading, error, data, isFetching };
};

export default useDynamicPage;
