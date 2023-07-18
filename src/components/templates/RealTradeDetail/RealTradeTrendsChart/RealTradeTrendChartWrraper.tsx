import React, { useMemo } from 'react';
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import useXAxisDate from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import { useAPI_DanjiTransactionTrends } from '@/apis/danji/danjiTransactionTrends';
import moment from 'moment';
import { ParentSize } from '@visx/responsive';
import { Chart } from './Chart';

type ComparisonList = {
  colorCode: string;
  name: string;
  danjiID: number;
  rt: number;
}[];

type ChartData = {
  com_first_price?: number;
  com_second_price?: number;
  com_third_price?: number;
  com_fourth_price?: number;
  com_fifth_price?: number;

  danji_price?: number;

  date: Date;
  isManipulate?: boolean;
}[];

export const RealTradeTrendChartWrraper = React.memo(
  ({
    comparisonList,
    danji,
    buyOrRent,
    selectedYear,
  }: {
    comparisonList: ComparisonList;
    danji?: GetDanjiDetailResponse;
    buyOrRent?: number;
    selectedYear?: number;
  }) => {
    const { listDanji: defaultDanji, isLoading: defaultLoading } = useAPI_DanjiTransactionTrends({
      danjiId: danji?.danji_id,
      realestateType: Number(danji?.type),
      buyOrRent,
      year: selectedYear,
    });

    const { listDanji: firstDanji, isLoading: firstDanjiLoading } = useAPI_DanjiTransactionTrends({
      danjiId: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#20C764')]?.danjiID || undefined
        : undefined,
      realestateType: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#20C764')]?.rt || undefined
        : undefined,
      buyOrRent,
      year: selectedYear,
    });

    const { listDanji: secondDanji, isLoading: secondDanjiLoading } = useAPI_DanjiTransactionTrends({
      danjiId: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#EA2323')]?.danjiID || undefined
        : undefined,
      realestateType: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#EA2323')]?.rt || undefined
        : undefined,
      buyOrRent,
      year: selectedYear,
    });

    const { listDanji: thirdDanji, isLoading: thirdDanjiLoading } = useAPI_DanjiTransactionTrends({
      danjiId: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#FFCD4E')]?.danjiID || undefined
        : undefined,
      realestateType: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#FFCD4E')]?.rt || undefined
        : undefined,
      buyOrRent,
      year: selectedYear,
    });

    const { listDanji: fourthDanji, isLoading: fourthDanjiLoading } = useAPI_DanjiTransactionTrends({
      danjiId: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#4C6EF5')]?.danjiID || undefined
        : undefined,
      realestateType: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#4C6EF5')]?.rt || undefined
        : undefined,
      buyOrRent,
      year: selectedYear,
    });

    const { listDanji: fifthDanji, isLoading: fifthDanjiLoading } = useAPI_DanjiTransactionTrends({
      danjiId: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#7048E8')]?.danjiID || undefined
        : undefined,
      realestateType: comparisonList
        ? comparisonList[comparisonList.findIndex((ele) => ele.colorCode === '#7048E8')]?.rt || undefined
        : undefined,
      buyOrRent,
      year: selectedYear,
    });

    const { data: xAxisData } = useXAxisDate(selectedYear || 3);
    const xAxis = xAxisData.slice(1, xAxisData.length - 1);

    const defaultDanjiChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};
      const danjiList = defaultDanji || [];
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
    }, [defaultDanji, xAxis]);

    const comOneDanjiChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};
      const danjiList = firstDanji || [];
      danjiList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          com_first_price: item.price,
        };
      });
      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            com_first_price: lastData?.com_first_price || 0,
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
    }, [firstDanji, xAxis]);

    const comTwoDanjiChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};
      const danjiList = secondDanji || [];
      danjiList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          com_second_price: item.price,
        };
      });
      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            com_second_price: lastData?.com_second_price || 0,
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
    }, [secondDanji, xAxis]);

    const comThirdDanjiChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};
      const danjiList = thirdDanji || [];
      danjiList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          com_third_price: item.price,
        };
      });
      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            com_third_price: lastData?.com_third_price || 0,
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
    }, [thirdDanji, xAxis]);

    const comFourthDanjiChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};
      const danjiList = fourthDanji || [];
      danjiList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          com_fourth_price: item.price,
        };
      });
      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            com_fourth_price: lastData?.com_fourth_price || 0,
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
    }, [fourthDanji, xAxis]);

    const comFifthDanjiChartData = useMemo(() => {
      const dataMap: { [date: string]: Partial<ChartData[0]> } = {};
      const danjiList = fifthDanji || [];
      danjiList.forEach((item) => {
        dataMap[item.date] = {
          ...dataMap[item.date],
          com_fifth_price: item.price,
        };
      });
      xAxis.forEach(({ date }) => {
        const month = moment(date).format('YYYY-M');
        if (!dataMap[month]) {
          const lastMonth = moment(month, 'YYYY-M').subtract(1, 'month').format('YYYY-M');
          const lastData = dataMap[lastMonth];
          dataMap[month] = {
            com_fifth_price: lastData?.com_fifth_price || 0,
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
    }, [fifthDanji, xAxis]);

    const hasChartData = useMemo(() => defaultDanji && defaultDanji.length > 0, [defaultDanji]);

    if (
      defaultLoading ||
      firstDanjiLoading ||
      secondDanjiLoading ||
      thirdDanjiLoading ||
      fourthDanjiLoading ||
      fifthDanjiLoading
    )
      return null;

    return hasChartData ? (
      <div>
        <div tw="flex flex-col [gap: 14px]">
          <span tw="text-b2 [line-height: 1] text-gray-1000">거래가격 추이</span>
          <span tw="text-info [line-height: 1] text-gray-700">*개별 거래가의 변동지수 (면적당 거래가)</span>
        </div>
        <div>
          <ParentSize>
            {({ width }) => (
              <Chart
                width={width}
                xAxis={xAxis}
                danjiChartData={defaultDanjiChartData}
                firstChartData={comOneDanjiChartData}
                secondChartData={comTwoDanjiChartData}
                thirdChartData={comThirdDanjiChartData}
                fourthChartData={comFourthDanjiChartData}
                fifthChartData={comFifthDanjiChartData}
                sl={selectedYear || 3}
              />
            )}
          </ParentSize>
        </div>
      </div>
    ) : null;
  },
);
