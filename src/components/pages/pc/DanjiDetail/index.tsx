import { Panel } from '@/components/atoms';
import { DanjiDetail } from '@/components/templates';
import { memo } from 'react';
import useDanjiDetail from './useDanjiDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth, depth }: Props) => {
  const {
    danji,
    danjiPhotos,
    danjiListings,
    danjiRealPricesData,
    danjiRealPricesPyoungList,
    buyOrRent,
    selectedYear,
    isShowDanjiPhotos,
    onChangeBuyOrRent,
    onChangeSelectedYear,
  } = useDanjiDetail(depth);

  return (
    <Panel width={panelWidth}>
      <DanjiDetail
        danji={danji}
        danjiPhotos={danjiPhotos}
        danjiListings={danjiListings}
        danjiRealPricesData={danjiRealPricesData}
        danjiRealPricesPyoungList={danjiRealPricesPyoungList}
        buyOrRent={buyOrRent}
        selectedYear={selectedYear}
        isShowDanjiPhotos={isShowDanjiPhotos}
        onClickListingDetail={() => {}}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
      />
    </Panel>
  );
});
