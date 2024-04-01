import { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import useUnmount from '@/hooks/useUnmount';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { apiService } from '@/services';

import useFetchNotificationList from '@/services/notifications/useFetchNotificationList';

export default function useNotificationList() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const { data, isLoading, increamentPageNumber, mutate: mutateList } = useFetchNotificationList();

  const { setUnreadNotificationCount } = useSyncronizer();

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

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
      if (platform === 'pc') {
        if (index === 1) {
          const depth1 = router?.query?.depth1 ?? '';
          const depth2 = router?.query?.depth1 ?? '';

          const query = router.query;

          delete query.depth1;
          delete query.depth2;

          if (depth1 && depth2) {
            if (depth1 === Routes.NotificationList) {
              router.push({ pathname: `/${Routes.NotificationSettings}/${depth2}`, query: { ...query } });
            } else {
              router.push({ pathname: `/${depth1}/${Routes.NotificationSettings}`, query: { ...query } });
            }
          } else if (depth1 && !depth2) {
            router.push({ pathname: `/${depth1}/${Routes.NotificationSettings}`, query: { ...query } });
          }
        } else if (index === 0) {
          setIsDeleting((prev) => !prev);
        }
      }

      if (platform === 'mobile') {
        if (index === 1) {
          router.replace(`/${Routes.EntryMobile}/${Routes.NotificationSettings}`);
        } else if (index === 0) {
          setIsDeleting((prev) => !prev);
        }
      }
    },
    [platform, router],
  );

  const handleChangeTabIndex = useCallback(
    (index: number) => {
      setTabIndex(index);
    },
    [setTabIndex],
  );

  const handleNotificationClick = useCallback(
    async (id: number) => {
      const response = await apiService.fetchNotificationUrl(id);

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
      await apiService.deleteNotifications(ids);
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
    (async () => {
      await apiService.readNotifications();
      setUnreadNotificationCount(0);
    })();
  }, [isDeleting, setUnreadNotificationCount]);

  useUnmount(async () => {
    await apiService.readNotifications();
    setUnreadNotificationCount(0);
  });

  return {
    isLoading,
    isDeleteLoading,
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
