import deleteNotifications from '@/apis/notification/deleteNotifications';
import useAPI_GetNotificationList from '@/apis/notification/getNotificationList';
import useAPI_GetUnreadNotificationCount from '@/apis/notification/getUnreadNotificationCount';
import readNotifications from '@/apis/notification/readNotifications';
import useUnmount from '@/hooks/utils/useUnmount';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function useNotificationList() {
  const router = useRouter();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const { mutate: mutateUnreadNotificationCount } = useAPI_GetUnreadNotificationCount();
  const { data, isLoading, increamentPageNumber, mutate } = useAPI_GetNotificationList();

  const [isDeleting, setIsDeleting] = useState(false);
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const notifications = useMemo(
    () =>
      data.map((item) => ({
        id: item.id,
        title: item.title,
        message: item.message,
        type: item.type,
        category: item.category,
        listingTitle: item.listing_title,
        createdTime: item.created_time,
        unread: item.read_time === null,
      })),
    [data],
  );

  const handleNextPage = useCallback(() => {
    increamentPageNumber();
  }, [increamentPageNumber]);

  const handleHeaderItemClick = useCallback(
    (index: number) => {
      if (index === 1) {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}/${Routes.NotificationSettings}`);
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

  const handleDelete = useCallback(async () => {
    const ids = Object.keys(checkedState)
      .filter((id) => checkedState[Number(id)])
      .join(',');
    if (ids !== '') {
      setIsDeleteLoading(true);
      await deleteNotifications(ids);
    }
    setIsDeleteLoading(false);
    setIsDeleting(false);
    mutate();
  }, [checkedState, mutate]);

  useEffect(() => {
    setCheckedState({});
  }, [isDeleting]);

  useUnmount(async () => {
    await readNotifications();
    mutateUnreadNotificationCount();
  });

  return {
    isLoading,
    isDeleteLoading,
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
