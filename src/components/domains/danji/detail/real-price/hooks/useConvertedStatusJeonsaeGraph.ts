/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';

import moment from 'moment';

import { useFetchDanjiJeonsaeStatusGraphSido } from '@/services/danji/useFetchDanjiJeonsaeStatusGraphSido';

import { useFetchDanjiJeonsaeStatusGraph } from '@/services/danji/useFetchDanjiJeonsaeStatusGraph';

import { DanjiDetailResponse } from '@/services/danji/types';

import useXAxisDate from './useXAxisDate';

import { ChartData } from '../chartTypes';

export default function useConvertedStatusJeonsaeGraph({
  danji,
  buyOrRent,
  selectedYear,
}: {
  danji?: DanjiDetailResponse;
  buyOrRent?: number;
  selectedYear: number;
}) {
  const {
    listDanji,
    listSigungu,
    isLoading: statusLoading,
  } = useFetchDanjiJeonsaeStatusGraph({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    buyOrRent,
    year: selectedYear,
  });

  const { listSido, isLoading: statusSidoLoading } = useFetchDanjiJeonsaeStatusGraphSido({
    danjiId: danji?.danji_id,
    realestateType: danji?.type,
    buyOrRent,
    year: selectedYear,
  });

  const { data: xAxisData } = useXAxisDate(selectedYear);
  const xAxis = xAxisData.slice(1);

  const danjiChartData = useMemo(() => {
    const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

    const danjiList = listDanji || [];

    danjiList.forEach((item) => {
      dataMap[item.date] = {
        ...dataMap[item.date],
        danji_jeonsae_rate: item.jeonsae_rate,
      };
    });

    xAxis.forEach(({ date }) => {
      const month = moment(date).format('YYYY-M');
      if (!dataMap[month]) {
        const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
        const lastData = dataMap[lastMonth];
        dataMap[month] = {
          danji_jeonsae_rate: lastData?.danji_jeonsae_rate || 0,
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
  }, [listDanji, selectedYear]);

  const sigunguChartData = useMemo(() => {
    const dataMap: { [date: string]: Partial<ChartData[0]> } = {};

    const sigunguList = listSigungu || [];

    sigunguList.forEach((item) => {
      dataMap[item.date] = {
        ...dataMap[item.date],
        sigungu_jeonsae_rate: item.jeonsae_rate,
      };
    });

    xAxis.forEach(({ date }) => {
      const month = moment(date).format('YYYY-M');
      if (!dataMap[month]) {
        const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
        const lastData = dataMap[lastMonth];
        dataMap[month] = {
          sido_jeonsae_rate: lastData?.sigungu_jeonsae_rate || 0,
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
        sido_jeonsae_rate: item.jeonsae_rate,
      };
    });

    xAxis.forEach(({ date }) => {
      const month = moment(date).format('YYYY-M');
      if (!dataMap[month]) {
        const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
        const lastData = dataMap[lastMonth];
        dataMap[month] = {
          sido_jeonsae_rate: lastData?.sido_jeonsae_rate || 0,
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
