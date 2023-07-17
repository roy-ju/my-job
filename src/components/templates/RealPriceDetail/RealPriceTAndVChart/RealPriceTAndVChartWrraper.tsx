import React, { useMemo } from 'react';

import DanjiIcon from '@/assets/icons/danji_dash_line.svg';
import DanjiBlueIcon from '@/assets/icons/danji_dash_line_blue.svg';
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import useXAxisDate from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import { useAPI_DanjiTransactionTrends } from '@/apis/danji/danjiTransactionTrends';
import moment from 'moment';
import { ParentSize } from '@visx/responsive';
import { useAPI_DanjiValues } from '@/apis/danji/danjiValues';
import { Chart } from './Chart';

type ChartData = {
  value_price?: number;
  value_count?: number | null;

  danji_price?: number;
  danji_count?: number | null;

  date: Date;
  isManipulate?: boolean;
}[];

export const RealPriceTAndVChartWrraper = React.memo(
  ({
    danji,
    buyOrRent,
    selectedYear,
  }: {
    danji?: GetDanjiDetailResponse;
    buyOrRent?: number;
    selectedYear?: number;
  }) => {
    const { listDanji } = useAPI_DanjiTransactionTrends({
      danjiId: danji?.danji_id,
      realestateType: Number(danji?.type),
      buyOrRent,
      year: selectedYear,
    });

    const { listDanji: valueListDanji } = useAPI_DanjiValues({
      danjiId: danji?.danji_id,
      realestateType: Number(danji?.type),
      buyOrRent,
      year: selectedYear,
    });

    const { data: xAxisData } = useXAxisDate(selectedYear || 3);
    const xAxis = xAxisData.slice(1);

    const trandsactionData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

      const danjiList = listDanji || [];

      danjiList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          danji_price: item.price,
        };
      });

      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            danji_price: lastData?.danji_price || 0,
            isManipulate: true,
          };
        }
      });

      const list = Object.entries(dataMap).map(([key, value]) => ({
        ...value,
        date: moment(key, 'YYYY-M').startOf('month').toDate(),
      }));

      const filteredList = list.filter(({ date }) =>
        moment(date).isBetween(moment(xAxis[0].date), moment(xAxis[xAxis.length - 1].date), 'month', '[]'),
      );

      return filteredList.sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [listDanji, xAxis]);

    const valuesData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

      const valueList = valueListDanji || [];

      valueList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          value_price: item.price,
        };
      });

      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            value_price: lastData?.value_price || 0,
            isManipulate: true,
          };
        }
      });

      const list = Object.entries(dataMap).map(([key, value]) => ({
        ...value,
        date: moment(key, 'YYYY-M').startOf('month').toDate(),
      }));

      const filteredList = list.filter(({ date }) =>
        moment(date).isBetween(moment(xAxis[0].date), moment(xAxis[xAxis.length - 1].date), 'month', '[]'),
      );

      return filteredList.sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [valueListDanji, xAxis]);

    return (
      <div>
        <div tw="flex flex-col [gap: 14px]">
          <span tw="text-b2 [line-height: 1] text-gray-1000">거래가격 / 평가가격 교차분석</span>
        </div>
        <div tw="flex items-center justify-center mt-4 bg-gray-100 gap-2 py-2.5">
          {danji?.name && (
            <>
              <div tw="flex items-center gap-1.5">
                <DanjiIcon />
                <span tw="[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
                  거래가격
                </span>
              </div>
              <div tw="flex items-center gap-1.5">
                <DanjiBlueIcon />
                <span tw="[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
                  평가가격
                </span>
              </div>
            </>
          )}
        </div>
        <div>
          {listDanji && listDanji.length > 0 && (
            <ParentSize>
              {({ width }) => (
                <Chart
                  width={width}
                  xAxis={xAxis}
                  trandsactionData={trandsactionData}
                  valuesData={valuesData}
                  sl={selectedYear || 3}
                  bor={buyOrRent}
                />
              )}
            </ParentSize>
          )}
        </div>
      </div>
    );
  },
);
