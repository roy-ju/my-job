import deleteNotifications from '@/apis/notification/deleteNotifications';
import useAPI_GetNotificationList from '@/apis/notification/getNotificationList';
import useAPI_GetUnreadNotificationCount from '@/apis/notification/getUnreadNotificationCount';
import readNotifications from '@/apis/notification/readNotifications';
import getNotificationUrl from '@/apis/notification/getNotificationUrl';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import useUnmount from '@/hooks/utils/useUnmount';
import Routes from '@/router/routes';
import { useCallback, useEffect, useMemo, useState } from 'react';

// import { useRouter as useNextRouter } from 'next/router';

export default function useNotificationList(depth: number) {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();
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
        router.replace(Routes.NotificationSettings);
      } else if (index === 0) {
        setIsDeleting((prev) => !prev);
      }
    },
    [router],
  );

  const handleNotificationClick = useCallback(
    async (id: number) => {
      const response = await getNotificationUrl(id);
      if (response === null) return;
      const url = response?.data?.url;
      nextRouter.replace(url);

      //    router.replace(url);
      // const url = new URL(window.location.toString());
      // console.log(url.pathname + url.search);
      // nextRouter.replace('/notifications/listingDetail?listingID=3070');
    },
    [nextRouter],
  );

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
