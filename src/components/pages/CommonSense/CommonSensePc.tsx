import { memo } from 'react';

import CommonSense from '@/components/domains/realestate-helper/CommonSense';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function CommonSensePc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <CommonSense />
    </Panel>
  );
}

export default memo(CommonSensePc);
