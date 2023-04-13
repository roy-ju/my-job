import { Panel } from '@/components/atoms';
import { DanjiDetail } from '@/components/templates';
import { memo } from 'react';
import useDanjiDetail from './useDanjiDetail';
import useDanjiStatusChart from './useDanjiStatusChart';
import useDanjiStatusChartJeonsae from './useDanjiStatusChartJeonsae';

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
    danjiTradeTurnRateData,
    danjiTradeTurnRateSigunguData,
    danjiJeonsaeRateRateData,
    danjiJeonsaeRateSigunguData,
    buyOrRent,
    selectedYear,
    isShowDanjiPhotos,
    selectedArea,
    selectedJeonyongArea,
    selectedJeonyongAreaMax,
    selectedIndex,
    onChangeSelectedArea,
    onChangeSelectedJeonyongArea,
    onChangeSelectedJeonyongAreaMax,
    onChangeSelectedIndex,
    onChangeBuyOrRent,
    onChangeSelectedYear,
  } = useDanjiDetail(depth);

  const { listDanji, danjiChartData, sidoChartData, sigunguChartData, xAxis } = useDanjiStatusChart({
    danji,
    buyOrRent,
    selectedYear,
  });

  const {
    listDanji: jeonsaeListDanji,
    danjiChartData: jeonsaeDanjiChartData,
    sidoChartData: jeonsaeSidoChartData,
    sigunguChartData: jeonsaeSigunguChartData,
  } = useDanjiStatusChartJeonsae({
    danji,
    buyOrRent,
    selectedYear,
  });

  return (
    <Panel width={panelWidth}>
      <DanjiDetail
        danji={danji}
        danjiPhotos={danjiPhotos}
        danjiListings={danjiListings}
        danjiRealPricesData={danjiRealPricesData}
        danjiRealPricesPyoungList={danjiRealPricesPyoungList}
        danjiTradeTurnRateData={danjiTradeTurnRateData}
        danjiTradeTurnRateSigunguData={danjiTradeTurnRateSigunguData}
        danjiJeonsaeRateRateData={danjiJeonsaeRateRateData}
        danjiJeonsaeRateSigunguData={danjiJeonsaeRateSigunguData}
        danjiChartData={danjiChartData}
        sigunguChartData={sigunguChartData}
        sidoChartData={sidoChartData}
        listDanji={listDanji}
        jeonsaeListDanji={jeonsaeListDanji}
        jeonsaeDanjiChartData={jeonsaeDanjiChartData}
        jeonsaeSigunguChartData={jeonsaeSigunguChartData}
        jeonsaeSidoChartData={jeonsaeSidoChartData}
        xAxis={xAxis}
        buyOrRent={buyOrRent}
        selectedYear={selectedYear}
        selectedArea={selectedArea}
        selectedJeonyongArea={selectedJeonyongArea}
        selectedJeonyongAreaMax={selectedJeonyongAreaMax}
        selectedIndex={selectedIndex}
        isShowDanjiPhotos={isShowDanjiPhotos}
        onClickListingDetail={() => {}}
        onChangeBuyOrRent={onChangeBuyOrRent}
        onChangeSelectedYear={onChangeSelectedYear}
        onChangeSelectedIndex={onChangeSelectedIndex}
        onChangeSelectedArea={onChangeSelectedArea}
        onChangeSelectedJeonyongArea={onChangeSelectedJeonyongArea}
        onChangeSelectedJeonyongAreaMax={onChangeSelectedJeonyongAreaMax}
      />
    </Panel>
  );
});
