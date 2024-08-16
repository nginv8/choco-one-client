import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/api';
import { dataTransform } from '@/utils';

const useCategories = (page = 1, pageSize = 25) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(page, pageSize),
    select: (rawData) => {
      const productListData = dataTransform.transformCategoriesData(rawData);
      return productListData;
    },
    staleTime: 10 * 60 * 1000,
  });

  return { isLoading, error, data, isFetching };
};

export default useCategories;
