/* eslint-disable react-hooks/exhaustive-deps */

import moment from 'moment';

import { useMemo } from 'react';

import { DanjiDetailResponse } from '@/services/danji/types';

import { useFetchDanjiStatusGraphSido } from '@/services/danji/useFetchDanjiStatusGraphSido';

import { useFetchDanjiStatusGraph } from '@/services/danji/useFetchDanjiStatusGraph';

import useXAxisDate from './useXAxisDate';

import { ChartData } from '../chartTypes';

export default function useConvertedStatusGraph({
  danji,
  buyOrRent,
  selectedYear,
}: {
  danji: DanjiDetailResponse;
  buyOrRent?: number;
  selectedYear: number;
}) {
  const {
    listDanji,
    listSigungu,
    isLoading: statusLoading,
  } = useFetchDanjiStatusGraph({
    danjiId: danji.danji_id,
    realestateType: danji.type,
    buyOrRent,
    year: selectedYear,
  });

  const { listSido, isLoading: statusSidoLoading } = useFetchDanjiStatusGraphSido({
    danjiId: danji.danji_id,
    realestateType: danji.type,
    buyOrRent,
    year: selectedYear,
  });

  const { data: xAxisData } = useXAxisDate(selectedYear);

  const xAxis = xAxisData.slice(1);

  const sigunguChartData = useMemo(() => {
    const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

    const sigunguList = listSigungu || [];

    sigunguList.forEach((item) => {
      dataMap[item.date] = {
        ...dataMap[item.date],
        sigungu_count: item.count || 0,
        sigungu_price: item.price,
      };
    });

    xAxis.forEach(({ date }) => {
      const month = moment(date).format('YYYY-M');
      if (!dataMap[month]) {
        const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
        const lastData = dataMap[lastMonth];
        dataMap[month] = {
          sigungu_count: 0,
          sigungu_price: lastData?.sigungu_price || 0,
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
  }, [listSigungu, selectedYear]);

  const sidoChartData = useMemo(() => {
    const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

    const sidoList = listSido || [];

    sidoList.forEach((item) => {
      dataMap[item.date] = {
        ...dataMap[item.date],
        sido_count: item.count || 0,
        sido_price: item.price,
      };
    });

    xAxis.forEach(({ date }) => {
      const month = moment(date).format('YYYY-M');
      if (!dataMap[month]) {
        const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
        const lastData = dataMap[lastMonth];
        dataMap[month] = {
          sido_count: 0,
          sido_price: lastData?.sido_price || 0,
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
  }, [listSido, selectedYear]);

  const danjiChartData = useMemo(() => {
    const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

    const danjiList = listDanji || [];

    danjiList.forEach((item) => {
      dataMap[item.date] = {
        ...dataMap[item.date],
        danji_count: item.count || 0,
        danji_price: item.price,
      };
    });

    xAxis.forEach(({ date }) => {
      const month = moment(date).format('YYYY-M');
      if (!dataMap[month]) {
        const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
        const lastData = dataMap[lastMonth];
        dataMap[month] = {
          danji_count: 0,
          danji_price: lastData?.danji_price || 0,
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
  }, [listDanji, selectedYear]);

  return useMemo(
    () => ({
      listDanji,
      listSigungu,
      listSido,
      danjiChartData,
      sigunguChartData,
      sidoChartData,
      xAxis,
      statusLoading,
      statusSidoLoading,
    }),
    [listDanji, listSigungu, statusLoading, statusSidoLoading, listSido, xAxis],
  );
}
