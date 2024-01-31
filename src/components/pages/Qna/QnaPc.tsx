import { memo } from 'react';

import QnaMain from '@/components/domains/qna/QnaMain';

import Panel from '@/components/atoms/Panel';

interface Props {
  panelWidth?: string;
}

function QnaPc({ panelWidth }: Props) {
  return (
    <Panel width={panelWidth}>
      <QnaMain />
    </Panel>
  );
}

export default memo(QnaPc);
