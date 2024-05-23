import React, { memo } from 'react';

import dynamic from 'next/dynamic';

import { ParentSize } from '@visx/responsive';

import { describeJeonsaeWolsaeSame } from '@/constants/enums';

import { ChartData, MonthStartDate } from './chartTypes';

import { TitleWrraper, Wrraper } from './widget/TransactionPerAreaWidget';

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

function TotalTrade({ danjiChartData, listDanji, xAxis, selectedYear, buyOrRent }: TotalTradeProps) {
  return (
    <Wrraper>
      <TitleWrraper>
        <span>총 거래량 ({describeJeonsaeWolsaeSame(buyOrRent)})</span>
      </TitleWrraper>

      {!listDanji || (listDanji && listDanji.length === 0) ? (
        <Nodata />
      ) : (
        <ParentSize>
          {({ width }) => (
            <TotalTradeChart width={width} xAxis={xAxis} danjiChartData={danjiChartData} selectedYear={selectedYear} />
          )}
        </ParentSize>
      )}
    </Wrraper>
  );
}

export default memo(TotalTrade);
