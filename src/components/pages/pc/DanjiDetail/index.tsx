import { Panel } from '@/components/atoms';
import { DanjiDetail } from '@/components/templates';
import { memo } from 'react';
import useDanjiDetail from './useDanjiDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const { danji, danjiPhotos, isShowDanjiPhotos, danjiListings } = useDanjiDetail(depth);

  return (
    <Panel width={panelWidth}>
      <DanjiDetail
        danji={danji}
        danjiPhotos={danjiPhotos}
        danjiListings={danjiListings}
        isShowDanjiPhotos={isShowDanjiPhotos}
        onClickListingDetail={() => {}}
      />
    </Panel>
  );
});
