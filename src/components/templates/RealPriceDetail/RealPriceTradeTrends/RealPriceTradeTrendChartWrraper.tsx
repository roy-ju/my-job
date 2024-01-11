import React, { useMemo } from 'react';

import DanjiIcon from '@/assets/icons/vertical_line.svg';
import SigunguIcon from '@/assets/icons/sigungu_line.svg';
import SidoIcon from '@/assets/icons/sido_line.svg';
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import useXAxisDate from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import moment from 'moment';
import { ParentSize } from '@visx/responsive';
import {
  useAPI_DanjiChartSidoTransactionCount,
  useAPI_DanjiChartTransactionCount,
} from '@/apis/danji/danjiTradeTrends';
import { Chart } from './Chart';

type ChartData = {
  sigungu_count?: number | null;
  sido_count?: number | null;
  danji_count?: number | null;
  date: Date;
  isManipulate?: boolean;
}[];

export const RealPriceTradeTrendChartWrraper = React.memo(
  ({
    danji,
    buyOrRent,
    selectedYear,
  }: {
    danji?: GetDanjiDetailResponse;
    buyOrRent?: number;
    selectedYear?: number;
  }) => {
    const { listDanji, listSigungu } = useAPI_DanjiChartTransactionCount({
      danjiId: danji?.danji_id,
      realestateType: Number(danji?.type),
      buyOrRent,
      year: selectedYear,
    });

    const { listSido } = useAPI_DanjiChartSidoTransactionCount({
      danjiId: danji?.danji_id,
      realestateType: Number(danji?.type),
      buyOrRent,
      year: selectedYear,
    });

    const { data: xAxisData } = useXAxisDate(selectedYear || 3);
    const xAxis = xAxisData.slice(0, xAxisData.length - 1);

    const sigunguChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

      const sigunguList = listSigungu || [];

      sigunguList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          sigungu_count: item.count,
        };
      });

      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          dataMap[month] = {
            sigungu_count: 0,
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
          sido_count: item.count,
        };
      });

      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          dataMap[month] = {
            sido_count: 0,
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
          danji_count: item.count,
        };
      });

      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          dataMap[month] = {
            danji_count: 0,
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
          <span tw="text-b2 [line-height: 1] text-gray-1000">1,000세대당 거래량</span>
        </div>
        <div tw="flex items-center justify-center mt-4 bg-gray-100 gap-2 py-2.5">
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
