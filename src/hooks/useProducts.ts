import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getProductsByIds } from '@/api';
import { dataTransform } from '@/utils';
import { ProductListType, RawProductList } from '@/types';

let abortControllers: AbortController[] = [];

const useGetProducts = (page: number = 1, pageSize: number = 10, categories: number[] = []) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['products', page, pageSize, categories],
    queryFn: () => {
      abortControllers.forEach((controller) => controller.abort());
      abortControllers = [];

      const abortController = new AbortController();
      abortControllers.push(abortController);

      return getProducts(page, pageSize, categories, abortController.signal);
    },
    select: useCallback((rawData: RawProductList): ProductListType => {
      const productListData = dataTransform.transformProductListData(rawData);
      return productListData;
    }, []),
    staleTime: 10 * 60 * 1000,
  });

  return { isLoading, error, data, isFetching };
};

const useGetProductByIds = (ids: number[], page = 1, pageSize = 10) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['products', ids, page, pageSize],
    queryFn: () => getProductsByIds(ids, page, pageSize),
    enabled: ids.length > 0,
    select: (rawData: RawProductList): ProductListType => {
      return dataTransform.transformProductListData(rawData);
    },
    staleTime: 10 * 60 * 1000,
  });

  return { isLoading, error, data, isFetching };
};

export { useGetProducts, useGetProductByIds };
