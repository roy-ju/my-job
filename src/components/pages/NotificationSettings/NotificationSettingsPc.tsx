import { memo } from 'react';

import NotificationSettings from '@/components/domains/notification/NotificationSettings';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function NotificationSettingsPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <NotificationSettings />
    </Panel>
  );
}

export default memo(NotificationSettingsPc);
