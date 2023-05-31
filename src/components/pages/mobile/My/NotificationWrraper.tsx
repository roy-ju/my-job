import { MobileContainer } from '@/components/atoms';
import { NotificationList as NotificationListTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import React from 'react';
import useNotificationList from './hooks/useNotificationList';

export default function NotificationWrraper() {
  const router = useRouter();

  const {
    filteredNotificationsByTabIndex,
    isLoading,
    isDeleting,
    checkedState,
    isDeleteLoading,
    tabIndex,
    handleChangeTabIndex,
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
    <MobileContainer>
      <NotificationListTemplate
        tabIndex={tabIndex}
        checkedState={checkedState}
        isLoading={isLoading}
        isDeleting={isDeleting}
        isDeleteLoading={isDeleteLoading}
        notifications={filteredNotificationsByTabIndex}
        onNext={handleNextPage}
        onClickHeaderItem={handleHeaderItemClick}
        onChangeNotificationChecked={handleNotificationChecked}
        onClickNotification={handleNotificationClick}
        onDeleteNotifications={handleDelete}
        onChangeTabIndex={handleChangeTabIndex}
        onClickBack={onClickBack}
      />
    </MobileContainer>
  );
}
