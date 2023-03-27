import useAPI_GetNotificationList from '@/apis/notification/getNotificationList';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useMemo } from 'react';

export default function useNotificationList(depth: number) {
  const router = useRouter(depth);

  const { data, isLoading, increamentPageNumber } = useAPI_GetNotificationList();

  const notifications = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        title: item.title,
        message: item.message,
        listingTitle: item.listing_title,
        createdTime: item.created_time,
        unread: item.read_time !== null,
      })),
    [data],
  );

  const handleNextPage = useCallback(() => {
    increamentPageNumber();
  }, [increamentPageNumber]);

  const handleHeaderItemClick = useCallback(
    (index: number) => {
      if (index === 1) {
        router.replace(Routes.NotificationSettings);
      }
    },
    [router],
  );

  return {
    isLoading,
    notifications,
    handleHeaderItemClick,
    handleNextPage,
  };
}
