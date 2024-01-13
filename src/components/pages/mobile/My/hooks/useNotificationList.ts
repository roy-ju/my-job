import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import useUnmount from '@/hooks/useUnmount';

import deleteNotifications from '@/apis/notification/deleteNotifications';

import useAPI_GetNotificationList from '@/apis/notification/getNotificationList';

import getNotificationUrl from '@/apis/notification/getNotificationUrl';

import readNotifications from '@/apis/notification/readNotifications';

import Routes from '@/router/routes';

export default function useNotificationList() {
  const router = useRouter();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const { data, isLoading, increamentPageNumber, mutate: mutateList } = useAPI_GetNotificationList();

  const { setUnreadNotificationCount } = useSyncronizer();

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
        router.replace(`/${Routes.EntryMobile}/${Routes.NotificationSettings}`);
      } else if (index === 0) {
        setIsDeleting((prev) => !prev);
      }
    },
    [router],
  );

  const handleChangeTabIndex = useCallback(
    (index: number) => {
      setTabIndex(index);
    },
    [setTabIndex],
  );

  const handleNotificationClick = useCallback(
    async (id: number) => {
      const response = await getNotificationUrl(id);

      if (response === null) return;
      const url = response?.data?.url;
      router.replace(url);
    },
    [router],
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
    mutateList();
  }, [checkedState, mutateList]);

  const filteredNotificationsByTabIndex = useMemo(() => {
    if (tabIndex === 0) return notifications;
    return notifications.filter((item) => item.type === tabIndex);
  }, [tabIndex, notifications]);

  useEffect(() => {
    setCheckedState({});
  }, [isDeleting]);

  useUnmount(async () => {
    await readNotifications();
    setUnreadNotificationCount(0);
  });

  return {
    isLoading,
    isDeleteLoading,
    notifications,
    filteredNotificationsByTabIndex,
    checkedState,
    isDeleting,
    tabIndex,
    handleChangeTabIndex,
    handleHeaderItemClick,
    handleNextPage,
    handleNotificationClick,
    handleNotificationChecked,
    handleDelete,
  };
}
