import { Panel } from '@/components/atoms';
import { DanjiDetail } from '@/components/templates';
import { memo } from 'react';
import useDanjiDetail from './useDanjiDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const { danji, mutate } = useDanjiDetail(depth);

  const handleMutateDanji = () => {
    mutate();
  };

  return (
    <Panel width={panelWidth}>
      <DanjiDetail depth={depth} danji={danji} isShowTab handleMutateDanji={handleMutateDanji} />
    </Panel>
  );
});
