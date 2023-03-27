import { Panel } from '@/components/atoms';
import { NotificationList as NotificationListTemplate } from '@/components/templates';
import { memo } from 'react';
import useNotificationList from './useNotificationList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { notifications, isLoading, handleNextPage, handleHeaderItemClick } = useNotificationList(depth);

  return (
    <Panel width={panelWidth}>
      <NotificationListTemplate
        isLoading={isLoading}
        notifications={notifications}
        onNext={handleNextPage}
        onClickHeaderItem={handleHeaderItemClick}
      />
    </Panel>
  );
});
