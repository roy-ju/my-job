import { Panel } from '@/components/atoms';
import { NotificationList as NotificationListTemplate } from '@/components/templates';
import { memo } from 'react';
import useNotificationList from './useNotificationList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
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
  } = useNotificationList(depth);

  return (
    <Panel width={panelWidth}>
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
      />
    </Panel>
  );
});
