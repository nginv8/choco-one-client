import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { dataTransform } from '@/utils';
import { getShopSettings } from '@/api';
import { RawShopData, ShopDataType } from '@/types';

const placeholderData: RawShopData = {
  data: {
    attributes: {
      name: '',
      description: '',
      currency: '',
      address: '',
      workingHours: '',
      copyRight: '',
      phones: [],
      emails: [],
      payment: [],
      taxes: [],
      delivery: [],
      socialMedia: [],
    },
  },
};

const useShop = () => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['shop'],
    placeholderData,
    queryFn: getShopSettings,
    select: useCallback((rawData: RawShopData): ShopDataType => {
      const shopData = dataTransform.transformShopData(rawData);
      return shopData;
    }, []),
    staleTime: 10 * 60 * 1000,
  });

  return { isLoading, error, data, isFetching };
};

export default useShop;
