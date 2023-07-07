/* eslint-disable @typescript-eslint/no-unused-vars */

import { Panel } from '@/components/atoms';
import { LegalCounselingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';

import Routes from '@/router/routes';
import { useRouter as useNextRouter } from 'next/router';

// import { useRouter as useNextRouter } from 'next/router';

import { memo, useCallback } from 'react';

interface Props {
  depth: number;
  panelWidth: string;
  qnaID?: number;
  ipAddress?: string;
}

export default memo(({ depth, panelWidth, qnaID, ipAddress }: Props) => {
  const router = useRouter(depth);

  const handleClickBack = () => {
    router.popLast();
  };

  if (!qnaID) return null;

  return (
    <Panel width={panelWidth}>
      <LegalCounselingDetail onClickBack={handleClickBack} />
    </Panel>
  );
});
