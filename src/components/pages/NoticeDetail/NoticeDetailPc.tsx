import { memo } from 'react';

import NoticeDetail from '@/components/domains/my/NoticeDetail';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function NoticeDetailPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <NoticeDetail />
    </Panel>
  );
}

export default memo(NoticeDetailPc);
