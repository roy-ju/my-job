/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-shadow */

import { useMemo } from 'react';

import { BuyOrRent } from '@/constants/enums';

import moment from 'moment';

import { DanjiDetailResponse, PyoungListItem } from '@/services/danji/types';

import { useFetchDanjiRealPriceChart } from '@/services/danji/useFetchDanjiRealPriceChart';

import useXAxisDate from './useXAxisDate';

import { ChartData } from '../chartTypes';

export default function useConvertedRealPriceChartData({
  danji,
  buyOrRent,
  selectedYear,
  selectedIndex,
  list,
  directDealExcluded,
}: {
  danji: DanjiDetailResponse;
  buyOrRent?: number;
  selectedYear: number;
  selectedIndex?: number;
  list: PyoungListItem[] | null;
  directDealExcluded: boolean;
}) {
  const { data: graphData, isLoading } = useFetchDanjiRealPriceChart({
    directDealExcluded,
    danjiId: danji.danji_id,
    realestateType: danji.type,
    buyOrRent,
    year: selectedYear,
    selectedIndex,
    list,
  });

  const { data: xAxisData } = useXAxisDate(selectedYear);

  const xAxis = xAxisData.slice(1);

  const data = useMemo(() => {
    const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

    const graphBuyData = graphData?.list || [];
    const graphJeonsaeData = graphData?.list || [];

    if (buyOrRent === BuyOrRent.Buy) {
      graphBuyData.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          buy_price: item.avg_price,
          buy_count: item.count,
          buy_prices: item.prices
            .split(',')
            .map((item) => Number(item))
            .filter((v) => v && v !== 0),
        };
      });

      xAxis.forEach(({ date }) => {
        const defaultMonth = moment(new Date('1970-01-01')).format('YYYY-M');

        const month = moment(date).format('YYYY-M');

        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          const defaultData = dataMap[defaultMonth];

          dataMap[month] = {
            buy_count: 0,
            buy_price: lastData?.buy_price ? lastData.buy_price : defaultData?.buy_price ? defaultData.buy_price : 0,
            buy_prices: null,
          };
        }
      });
    } else {
      graphJeonsaeData.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          jeonsae_count: item.count,
          jeonsae_price: item.avg_price,
          jeonsae_prices: item.prices
            .split(',')
            .map((item) => Number(item))
            .filter((v) => v && v !== 0),
        };
      });

      xAxis.forEach(({ date }) => {
        const defaultMonth = moment(new Date('1970-01-01')).format('YYYY-M');

        const month = moment(date).format('YYYY-M');

        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          const defaultData = dataMap[defaultMonth];

          dataMap[month] = {
            jeonsae_count: 0,
            jeonsae_price: lastData?.jeonsae_price
              ? lastData.jeonsae_price
              : defaultData?.jeonsae_price
              ? defaultData.jeonsae_price
              : 0,
            jeonsae_prices: null,
          };
        }
      });
    }

    const list = Object.entries(dataMap).map(([key, value]) => ({
      ...value,
      date: moment(key, 'YYYY-M').startOf('month').toDate(),
    }));

    const filteredList = list.filter(({ date }) =>
      moment(date).isBetween(moment(xAxis[0].date), moment(xAxis[xAxis.length - 1].date), 'month', '[]'),
    );

    return filteredList.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [graphData, buyOrRent, selectedYear]);

  return useMemo(
    () => ({ realData: graphData?.list || [], realpricesChartData: data, xAxis, isLoading }),
    [data, selectedYear],
  );
}
