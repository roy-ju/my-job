import { memo } from 'react';

import NotificationList from '@/components/domains/notification/NotificationList';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function NotificationsPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <NotificationList />
    </Panel>
  );
}

export default memo(NotificationsPc);
