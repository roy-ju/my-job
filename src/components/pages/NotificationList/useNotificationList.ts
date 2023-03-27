import useAPI_GetNotificationList from '@/apis/notification/getNotificationList';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useNotificationList(depth: number) {
  const router = useRouter(depth);

  const { data, isLoading, increamentPageNumber } = useAPI_GetNotificationList();

  const [isDeleting, setIsDeleting] = useState(false);
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

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
      } else if (index === 0) {
        setIsDeleting((prev) => !prev);
      }
    },
    [router],
  );

  const handleNotificationClick = useCallback((id: number) => {
    console.log('clicked', id);
  }, []);

  const handleNotificationChecked = useCallback((id: number, checked: boolean) => {
    setCheckedState((prev) => ({ ...prev, [id]: checked }));
  }, []);

  const handleDelete = useCallback(() => {
    // const ids = Object.keys(checkedState)
    //   .filter((id) => checkedState[Number(id)])
    //   .map((id) => Number(id));
    setIsDeleting(false);
  }, []);

  useEffect(() => {
    setCheckedState({});
  }, [isDeleting]);

  return {
    isLoading,
    notifications,
    checkedState,
    isDeleting,
    handleHeaderItemClick,
    handleNextPage,
    handleNotificationClick,
    handleNotificationChecked,
    handleDelete,
  };
}
