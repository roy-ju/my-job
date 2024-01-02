import React, { memo } from 'react';

import { describeJeonsaeWolsaeSame } from '@/constants/enums';

import { ParentSize } from '@visx/responsive';

import dynamic from 'next/dynamic';

import { ChartData, MonthStartDate } from '../../utils/chartTypes';

const Nodata = dynamic(() => import('./RealPriceChartNodata'), {
  ssr: false,
});

const TotalTradeChart = dynamic(() => import('./TotalTradeChart'), {
  ssr: false,
});

type TotalTradeProps = {
  listDanji: {
    date: string;
    price: number;
    count: number;
  }[];
  danjiChartData: ChartData;
  buyOrRent?: number;
  selectedYear: number;
  xAxis: MonthStartDate[];
};

function TotalTrade({
  danjiChartData,
  listDanji,
  xAxis,
  selectedYear,

  buyOrRent,
}: TotalTradeProps) {
  return (
    <div tw="px-5 mt-10">
      <div tw="mb-3">
        <span tw="text-b2 [line-height: 1.0625rem] [letter-spacing: -0.4px]">
          총 거래량 ({describeJeonsaeWolsaeSame(buyOrRent)})
        </span>
      </div>

      {!listDanji || (listDanji && listDanji.length === 0) ? (
        <Nodata />
      ) : (
        <ParentSize>
          {({ width }) => (
            <TotalTradeChart width={width} xAxis={xAxis} danjiChartData={danjiChartData} selectedYear={selectedYear} />
          )}
        </ParentSize>
      )}
    </div>
  );
}

export default memo(TotalTrade);
