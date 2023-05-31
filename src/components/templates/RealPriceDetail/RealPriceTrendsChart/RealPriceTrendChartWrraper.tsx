import React, { useMemo } from 'react';

import DanjiIcon from '@/assets/icons/danji_line.svg';
import SigunguIcon from '@/assets/icons/sigungu_line.svg';
import SidoIcon from '@/assets/icons/sido_line.svg';
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import useXAxisDate from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import { useAPI_DanjiTransactionSidoTrends, useAPI_DanjiTransactionTrends } from '@/apis/danji/danjiTransactionTrends';
import moment from 'moment';
import { ParentSize } from '@visx/responsive';
import { Chart } from './Chart';

type ChartData = {
  sigungu_price?: number;
  sigungu_count?: number | null;

  sido_price?: number;
  sido_count?: number | null;

  danji_price?: number;
  danji_count?: number | null;

  date: Date;
  isManipulate?: boolean;
}[];

export const RealPriceTrendChartWrraper = React.memo(
  ({
    danji,
    buyOrRent,
    selectedYear,
  }: {
    danji?: GetDanjiDetailResponse;
    buyOrRent?: number;
    selectedYear?: number;
  }) => {
    const { listDanji, listSigungu } = useAPI_DanjiTransactionTrends({
      pnu: danji?.pnu,
      realestateType: Number(danji?.type),
      buyOrRent,
      year: selectedYear,
    });

    const { listSido } = useAPI_DanjiTransactionSidoTrends({
      pnu: danji?.pnu,
      realestateType: Number(danji?.type),
      buyOrRent,
      year: selectedYear,
    });

    const { data: xAxisData } = useXAxisDate(selectedYear || 3);
    const xAxis = xAxisData.slice(1);

    const sigunguChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

      const sigunguList = listSigungu || [];

      sigunguList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          sigungu_price: item.price,
        };
      });

      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            sigungu_price: lastData?.sigungu_price || 0,
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
    }, [listSigungu, xAxis]);

    const sidoChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

      const sidoList = listSido || [];

      sidoList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          sido_price: item.price,
        };
      });

      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            sido_price: lastData?.sido_price || 0,
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
    }, [listSido, xAxis]);

    const danjiChartData = useMemo(() => {
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

    return (
      <div>
        <div tw="flex flex-col [gap: 14px]">
          <span tw="text-b2 [line-height: 1] text-gray-1000">거래가격 추이</span>
          <span tw="text-info [line-height: 1] text-gray-700">*개별 실거래가격 자체의 평균값 (면적당)</span>
        </div>
        <div tw="flex items-center justify-center mt-3 bg-gray-100 gap-2 py-2.5">
          {danji?.name && (
            <div tw="flex items-center gap-1.5">
              <DanjiIcon />
              <span tw="[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
                {danji.name}
              </span>
            </div>
          )}
          {danji?.sigungu_name && (
            <div tw="flex items-center gap-1.5">
              <SigunguIcon />
              <span tw="[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
                {danji.sigungu_name}
              </span>
            </div>
          )}
          {danji?.sido_name &&
            (danji.sido_name === '세종특별자치시' ? null : (
              <div tw="flex items-center gap-1.5">
                <SidoIcon />
                <span tw="[max-width: 4.5rem] text-info text-gray-700 [line-height: 0.875rem] [text-overflow: ellipsis] overflow-hidden whitespace-nowrap">
                  {danji.sido_name}
                </span>
              </div>
            ))}
        </div>
        <div>
          {listDanji && listDanji.length > 0 && (
            <ParentSize>
              {({ width }) => (
                <Chart
                  width={width}
                  danjiName={danji?.name}
                  sigunguName={danji?.sigungu_name}
                  sidoName={danji?.sido_name}
                  xAxis={xAxis}
                  danjiChartData={danjiChartData}
                  sigunguChartData={sigunguChartData}
                  sidoChartData={sidoChartData}
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
