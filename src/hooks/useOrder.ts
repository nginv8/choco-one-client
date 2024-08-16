import { useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrder, getOneOrder, getOrders } from '@/api';
import useBoundStore from '@/store/useBoundStore';
import { dataTransform, handleQueryErrorMessage } from '@/utils';
import { OrderListType, RawOrder, RawOrderList, ReceivedOrderType } from '@/types';
import useAlert from './useAlert';

type OrderResponseType = {
  id: number;
  status: string;
};

const useGetOrderById = (id: number) => {
  const token = useBoundStore((state) => state.jwt);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOneOrder({ id, token }),
    select: useCallback((rawData: RawOrder): ReceivedOrderType => {
      const orderListData = dataTransform.transformOrderData(rawData);
      return orderListData;
    }, []),
    staleTime: 5 * 60 * 1000,
  });

  return { isLoading, error, data, isFetching };
};

const useGetOrders = (page = 1, pageSize = 10) => {
  const token = useBoundStore((state) => state.jwt);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['orders', page, pageSize],
    queryFn: () => getOrders({ page, pageSize, token }),
    select: useCallback((rawData: RawOrderList): OrderListType => {
      const orderListData = dataTransform.transformOrderListData(rawData);

      return orderListData;
    }, []),
    staleTime: 5 * 60 * 1000,
  });

  return { isLoading, error, data, isFetching };
};

const useCreateOrder = () => {
  const { showErrorAlert, showSuccessAlert } = useAlert();
  const purgeCart = useBoundStore((state) => state.purgeCart);
  const setCartStep = useBoundStore((state) => state.setCartStep);

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data: OrderResponseType) => {
      purgeCart();
      setCartStep('order success');
      showSuccessAlert('Success!', 'Your order has been placed successfully');
      return data;
    },
    onError: (error) => {
      console.error('Error creating order:', handleQueryErrorMessage(error));
      showErrorAlert('Something went wrong:', "Couldn't place your order");
      setCartStep('order failure');
    },
  });
};

export { useCreateOrder, useGetOrders, useGetOrderById };
