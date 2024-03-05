import { memo } from 'react';

import NoticeList from '@/components/domains/my/NoticeList';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function NoticeListPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <NoticeList />
    </Panel>
  );
}

export default memo(NoticeListPc);
