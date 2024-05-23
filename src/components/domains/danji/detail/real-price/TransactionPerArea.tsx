import React, { memo } from 'react';

import dynamic from 'next/dynamic';

import { ParentSize } from '@visx/responsive';

import { BuyOrRent, describeJeonsaeWolsaeSame } from '@/constants/enums';

import { StatusListItem, StatusJeonsaeListItem } from '@/services/danji/types';

import { ChartData, MonthStartDate } from './chartTypes';

import { TitleWrraper, Wrraper } from './widget/TransactionPerAreaWidget';

const Nodata = dynamic(() => import('./RealPriceChartNodata'), {
  ssr: false,
});

const TransactionPerAreaChart = dynamic(() => import('./TransactionPerAreaChart'), {
  ssr: false,
});

const TransactionJeonsaePerAreaChart = dynamic(() => import('./TransactionJeonsaePerAreaChart'), {
  ssr: false,
});

type TransactionPerAreaProps = {
  xAxis: MonthStartDate[];
  buyOrRent?: number;
  selectedYear: number;
  listDanji: StatusListItem[];
  listSigungu: StatusListItem[];
  listSido: StatusListItem[];
  jeonsaeListDanji: StatusJeonsaeListItem[];
  jeonsaeListSigungu: StatusJeonsaeListItem[];
  jeonsaeListSido: StatusJeonsaeListItem[];
  danjiChartData: ChartData;
  sigunguChartData: ChartData;
  sidoChartData: ChartData;
  jeonsaeDanjiChartData: ChartData;
  jeonsaeSigunguChartData: ChartData;
  jeonsaeSidoChartData: ChartData;
};

function TransactionPerArea({
  xAxis,
  buyOrRent,
  selectedYear,
  listDanji,
  listSigungu,
  listSido,
  danjiChartData,
  sigunguChartData,
  sidoChartData,
  jeonsaeListDanji,
  jeonsaeListSigungu,
  jeonsaeListSido,
  jeonsaeDanjiChartData,
  jeonsaeSigunguChartData,
  jeonsaeSidoChartData,
}: TransactionPerAreaProps) {
  return (
    <>
      <Wrraper>
        <TitleWrraper>
          <span>면적당 거래가 ({describeJeonsaeWolsaeSame(buyOrRent)} / ㎡)</span>
        </TitleWrraper>

        {((listDanji && listDanji.length === 0) || !listDanji) &&
        ((listSido && listSido.length === 0) || !listSido) &&
        ((listSigungu && listSigungu.length === 0) || !listSigungu) ? (
          <Nodata />
        ) : (
          <ParentSize>
            {({ width }) => (
              <TransactionPerAreaChart
                width={width}
                xAxis={xAxis}
                danjiChartData={danjiChartData}
                sigunguChartData={sigunguChartData}
                sidoChartData={sidoChartData}
                selectedYear={selectedYear}
              />
            )}
          </ParentSize>
        )}
      </Wrraper>

      {buyOrRent === BuyOrRent.Jeonsae && (
        <Wrraper>
          <TitleWrraper>
            <span>평균 전세가율</span>
          </TitleWrraper>

          {((jeonsaeListDanji && jeonsaeListDanji.length === 0) || !jeonsaeListDanji) &&
          ((jeonsaeListSido && jeonsaeListSido.length === 0) || !jeonsaeListSido) &&
          ((jeonsaeListSigungu && jeonsaeListSigungu.length === 0) || !jeonsaeListSigungu) ? (
            <Nodata />
          ) : (
            <ParentSize>
              {({ width }) => (
                <TransactionJeonsaePerAreaChart
                  width={width}
                  xAxis={xAxis}
                  danjiChartData={jeonsaeDanjiChartData}
                  sigunguChartData={jeonsaeSigunguChartData}
                  sidoChartData={jeonsaeSidoChartData}
                  selectedYear={selectedYear}
                />
              )}
            </ParentSize>
          )}
        </Wrraper>
      )}
    </>
  );
}

export default memo(TransactionPerArea);
