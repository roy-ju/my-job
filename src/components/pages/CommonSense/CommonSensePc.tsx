import { memo } from 'react';

import CommonSense from '@/components/domains/realestate-helper/CommonSense';

import AuthRequired from '@/components/atoms/AuthRequired';

import Panel from '@/components/atoms/Panel';

interface Props {
  depth: number;
  panelWidth?: string;
}

function CommonSensePc({ panelWidth, depth }: Props) {
  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <CommonSense />
      </Panel>
    </AuthRequired>
  );
}

export default memo(CommonSensePc);
