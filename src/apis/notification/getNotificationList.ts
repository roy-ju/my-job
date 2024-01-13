import useAuth from '@/hooks/services/useAuth';
import { useCallback, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

interface NotificationListItem {
  id: number;
  link_type: number;
  type: number;
  category: number;
  user_id: number;
  title: string;
  message: string;
  listing_title: string;
  listing_id: number;
  chat_room_id: any;
  read_time: string | null;
  deleted_time: any;
  created_time: string;
}

export interface GetNotificationListResponse {
  has_next: boolean;
  total_count: number;
  list: NotificationListItem[];
}

function getKey(size: number, previousPageData: GetNotificationListResponse) {
  if (previousPageData && !previousPageData.has_next) return null;
  return ['/notification/list', { page_number: size + 1, page_size: 10 }];
}

export default function useAPI_GetNotificationList() {
  const { user } = useAuth();
  const {
    data: dataList,
    size,
    setSize,
    isLoading,
    mutate,
  } = useSWRInfinite<GetNotificationListResponse>(user ? getKey : () => null);

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
