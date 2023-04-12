import { MobNotificationList } from '@/components/templates';
import { useRouter } from 'next/router';
import React from 'react';
import useNotificationList from './hooks/useNotificationList';

export default function NotificationWrraper() {
  const router = useRouter();

  const {
    notifications,
    isLoading,
    isDeleting,
    checkedState,
    isDeleteLoading,
    handleNextPage,
    handleHeaderItemClick,
    handleNotificationChecked,
    handleNotificationClick,
    handleDelete,
  } = useNotificationList();

  const onClickBack = () => {
    router.back();
  };

  return (
    <MobNotificationList
      checkedState={checkedState}
      isLoading={isLoading}
      isDeleting={isDeleting}
      isDeleteLoading={isDeleteLoading}
      notifications={notifications}
      onNext={handleNextPage}
      onClickHeaderItem={handleHeaderItemClick}
      onChangeNotificationChecked={handleNotificationChecked}
      onClickNotification={handleNotificationClick}
      onDeleteNotifications={handleDelete}
      onClickBack={onClickBack}
    />
  );
}
