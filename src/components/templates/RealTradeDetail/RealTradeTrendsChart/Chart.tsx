import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import React, { useMemo } from 'react';

import { AxisLeft } from '@visx/axis';

import { GridRows } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath } from '@visx/shape';

import { extent } from 'd3-array';

import { toNumber } from '@/utils/toNumber';
import { formatNumberInKorean } from '@/utils';
import { DanjiChartAxisBottom } from '../../DanjiDetail/DanjiChartAxisBottom';

const lineChartHeight = 131;
const yAxisWidth = 42;
const paddingRight = 16;
const paddingLeft = 11;
const paddingVertical = 9;

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

function getDate(d: ChartData[0]) {
  return d?.date ? new Date(d.date).valueOf() : new Date();
}

function getDanjiPrice(d: ChartData[0]) {
  return d?.danji_price;
}

function getPriceOne(d: ChartData[0]) {
  return d?.com_first_price;
}

function getPriceTwo(d: ChartData[0]) {
  return d?.com_second_price;
}

function getPriceThird(d: ChartData[0]) {
  return d?.com_third_price;
}

function getPriceFourth(d: ChartData[0]) {
  return d?.com_fourth_price;
}

function getPriceFifth(d: ChartData[0]) {
  return d?.com_fifth_price;
}

export const Chart = React.memo(
  ({
    width,
    xAxis,
    danjiChartData,
    firstChartData,
    secondChartData,
    thirdChartData,
    fourthChartData,
    fifthChartData,
    sl,
  }: {
    width: number;
    xAxis: MonthStartDate[];
    danjiChartData: ChartData;
    firstChartData: ChartData;
    secondChartData: ChartData;
    thirdChartData: ChartData;
    fourthChartData: ChartData;
    fifthChartData: ChartData;
    sl: number;
  }) => {
    const xScale = useMemo(
      () =>
        scaleTime({
          domain: [
            new Date(xAxis[0].date.getFullYear(), xAxis[0].date.getMonth()),
            new Date(xAxis[xAxis.length - 1].date.getFullYear(), xAxis[xAxis.length - 1].date.getMonth()),
          ],

          range: [yAxisWidth + paddingLeft, width - paddingRight],
        }),
      [xAxis, width],
    );

    const yScalePrice = useMemo(() => {
      const filtedDanjiData = danjiChartData.filter((item) => item.danji_price && item.danji_price > 0);

      const filtedDataOne = firstChartData.filter((item) => item.com_first_price && item.com_first_price > 0);

      const filtedDataTwo = secondChartData.filter((item) => item.com_second_price && item.com_second_price > 0);

      const filtedDataThird = thirdChartData.filter((item) => item.com_third_price && item.com_third_price > 0);

      const filtedDataFourth = fourthChartData.filter((item) => item.com_fourth_price && item.com_fourth_price > 0);

      const filtedDataFifth = fifthChartData.filter((item) => item.com_fifth_price && item.com_fifth_price > 0);

      return scaleLinear({
        domain: extent([
          ...(extent(filtedDataOne, (d) => getPriceOne(d)) as number[]),
          ...(extent(filtedDataTwo, (d) => getPriceTwo(d)) as number[]),
          ...(extent(filtedDataThird, (d) => getPriceThird(d)) as number[]),
          ...(extent(filtedDataFourth, (d) => getPriceFourth(d)) as number[]),
          ...(extent(filtedDataFifth, (d) => getPriceFifth(d)) as number[]),
          ...(extent(filtedDanjiData, (d) => getDanjiPrice(d)) as number[]),
        ]) as number[],
        range: [lineChartHeight - paddingVertical, paddingVertical],
      });
    }, [danjiChartData, fifthChartData, firstChartData, fourthChartData, secondChartData, thirdChartData]);

    const danjiLineChartComponent = useMemo(() => {
      if (!danjiChartData) return null;

      const memoizedData = danjiChartData.filter((d) => d.danji_price && d.danji_price > 0);

      return (
        <LinePath
          stroke="#FF542D"
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getDanjiPrice(d) as number)}
        />
      );
    }, [danjiChartData, xScale, yScalePrice]);

    const comOneLineChartComponent = useMemo(() => {
      if (!firstChartData) return null;

      const memoizedData = firstChartData.filter((d) => d.com_first_price && d.com_first_price > 0);

      return (
        <LinePath
          stroke="#20C764"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getPriceOne(d) as number)}
        />
      );
    }, [firstChartData, xScale, yScalePrice]);

    const comTwoLineChartComponent = useMemo(() => {
      if (!secondChartData) return null;

      const memoizedData = secondChartData.filter((d) => d.com_second_price && d.com_second_price > 0);

      return (
        <LinePath
          stroke="#EA2323"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getPriceTwo(d) as number)}
        />
      );
    }, [secondChartData, xScale, yScalePrice]);

    const comThirdLineChartComponent = useMemo(() => {
      if (!thirdChartData) return null;

      const memoizedData = thirdChartData.filter((d) => d.com_third_price && d.com_third_price > 0);

      return (
        <LinePath
          stroke="#FFCD4E"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getPriceThird(d) as number)}
        />
      );
    }, [thirdChartData, xScale, yScalePrice]);

    const comFourthLineChartComponent = useMemo(() => {
      if (!fourthChartData) return null;

      const memoizedData = fourthChartData.filter((d) => d.com_fourth_price && d.com_fourth_price > 0);

      return (
        <LinePath
          stroke="#4C6EF5"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getPriceFourth(d) as number)}
        />
      );
    }, [fourthChartData, xScale, yScalePrice]);

    const comFifthLineChartComponent = useMemo(() => {
      if (!fifthChartData) return null;

      const memoizedData = fifthChartData.filter((d) => d.com_fifth_price && d.com_fifth_price > 0);

      return (
        <LinePath
          stroke="#7048E8"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getPriceFifth(d) as number)}
        />
      );
    }, [fifthChartData, xScale, yScalePrice]);

    const tickValues = useMemo(() => {
      const filtedDanjiData = danjiChartData.filter((item) => item.danji_price && item.danji_price > 0);

      const filtedDataOne = firstChartData.filter((item) => item.com_first_price && item.com_first_price > 0);

      const filtedDataTwo = secondChartData.filter((item) => item.com_second_price && item.com_second_price > 0);

      const filtedDataThird = thirdChartData.filter((item) => item.com_third_price && item.com_third_price > 0);

      const filtedDataFourth = fourthChartData.filter((item) => item.com_fourth_price && item.com_fourth_price > 0);

      const filtedDataFifth = fifthChartData.filter((item) => item.com_fifth_price && item.com_fifth_price > 0);

      const lowerUpperBound = extent([
        ...(extent(filtedDataOne, (d) => getPriceOne(d)) as number[]),
        ...(extent(filtedDataTwo, (d) => getPriceTwo(d)) as number[]),
        ...(extent(filtedDataThird, (d) => getPriceThird(d)) as number[]),
        ...(extent(filtedDataFourth, (d) => getPriceFourth(d)) as number[]),
        ...(extent(filtedDataFifth, (d) => getPriceFifth(d)) as number[]),
        ...(extent(filtedDanjiData, (d) => getDanjiPrice(d)) as number[]),
      ]) as number[];

      const round = (value: number) => Math.round(value / 10000) * 10000;

      const lowerBoundPrice = toNumber(lowerUpperBound[0]);
      const upperBoundPrice = toNumber(lowerUpperBound[1]);
      const middlePrice = (lowerBoundPrice + upperBoundPrice) / 2;
      const lowerMiddlePrice = (middlePrice + lowerBoundPrice) / 2;
      const upperMiddlePrice = (middlePrice + upperBoundPrice) / 2;

      return [
        round(lowerBoundPrice),
        round(lowerMiddlePrice),
        round(middlePrice),
        round(upperMiddlePrice),
        round(upperBoundPrice),
      ];
    }, [danjiChartData, firstChartData, secondChartData, thirdChartData, fourthChartData, fifthChartData]);

    return (
      <div
        style={{
          position: 'relative',
          marginTop: '12px',
        }}
      >
        <svg width={width} height={lineChartHeight}>
          <line
            x1={yAxisWidth - 1.5}
            x2={width}
            y1={lineChartHeight}
            y2={lineChartHeight}
            style={{ stroke: '#E9ECEF', strokeWidth: 2 }}
          />
          <GridRows
            width={width - yAxisWidth}
            left={yAxisWidth}
            scale={yScalePrice}
            tickValues={tickValues}
            stroke="#E9ECEF"
            strokeOpacity="0.5"
          />
          <AxisLeft
            left={yAxisWidth}
            scale={yScalePrice}
            tickLength={4}
            tickStroke="transparent"
            strokeWidth={0}
            tickValues={tickValues}
            tickFormat={(price) => {
              if (tickValues.filter((ele) => ele > 100000000).length === 0) {
                return formatNumberInKorean(toNumber(price));
              }

              if (price < 10000000) {
                return formatNumberInKorean(toNumber(price));
              }

              return `${(toNumber(price) / 100000000).toFixed(2)}억`;
            }}
            tickLabelProps={() => ({
              dy: '0.3em',
              fontSize: '12px',
              // fontFamily: 'pretend',
              fontWeight: 400,
              fill: '#868E96',
              textAnchor: 'end',
            })}
          />

          {comOneLineChartComponent}
          {comTwoLineChartComponent}
          {comThirdLineChartComponent}
          {comFourthLineChartComponent}
          {comFifthLineChartComponent}
          {danjiLineChartComponent}
        </svg>
        <div style={{ position: 'absolute', bottom: -20 }}>
          <DanjiChartAxisBottom
            width={width}
            paddingLeft={paddingLeft}
            xScale={xScale}
            selectedYear={sl}
            xAxis={xAxis}
          />
        </div>
      </div>
    );
  },
);
