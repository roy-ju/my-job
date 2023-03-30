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
  } = useNotificationList(depth);

  return (
    <Panel width={panelWidth}>
      <NotificationListTemplate
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
      />
    </Panel>
  );
});
