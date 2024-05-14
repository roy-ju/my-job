import { memo } from 'react';

import dynamic from 'next/dynamic';

import { Panel } from '@/components/atoms';

import { DanjiDetail } from '@/components/templates';

import useDanjiDetail from './useDanjiDetail';

const InvalidAccessPopup = dynamic(() => import('@/components/organisms/popups/InvalidAccessPopup'), {
  ssr: false,
});

interface Props {
  prefetchedData?: { [key: string]: any } | null;
  depth: number;
  panelWidth?: string;
}

export default memo(({ prefetchedData, panelWidth, depth }: Props) => {
  const { danji, mutate } = useDanjiDetail(depth, undefined, prefetchedData);

  const handleMutateDanji = () => {
    mutate();
  };

  return (
    <Panel width={panelWidth}>
      <div />
      {danji && !danji.error_code && (
        <DanjiDetail depth={depth} danji={danji} isShowTab handleMutateDanji={handleMutateDanji} />
      )}

      {danji && danji.error_code && <InvalidAccessPopup />}
    </Panel>
  );
});
