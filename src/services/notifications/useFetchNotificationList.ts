import { useCallback, useMemo } from 'react';

import useAuth from '@/hooks/services/useAuth';

import useSWRInfinite from 'swr/infinite';

import { NotificationListResponse } from './types';

function getKey(size: number, previousPageData: NotificationListResponse) {
  if (previousPageData && !previousPageData.has_next) return null;
  return ['/notification/list', { page_number: size + 1, page_size: 10 }];
}

export default function useFetchNotificationList() {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<NotificationListResponse>(user ? getKey : () => null);

  const data = useMemo(() => {
    if (!dataList) return [];
    return dataList?.map((item) => item.list).flat();
  }, [dataList]);

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    data,
    pageNumber: size,
    isLoading,
    increamentPageNumber,
    mutate,
  };
}
