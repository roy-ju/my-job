import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import React, { useMemo } from 'react';
import { AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { LinePath } from '@visx/shape';
import { extent } from 'd3-array';
import { DanjiChartAxisBottom } from '../../DanjiDetail/DanjiChartAxisBottom';

const lineChartHeight = 131;
const yAxisWidth = 42;
const paddingRight = 16;
const paddingLeft = 11;
const paddingVertical = 9;

type ChartData = {
  com_first_count?: number;
  com_second_count?: number;
  com_third_count?: number;
  com_fourth_count?: number;
  com_fifth_count?: number;

  danji_count?: number;

  date: Date;
  isManipulate?: boolean;
}[];

function getDate(d: ChartData[0]) {
  return d?.date ? new Date(d.date).valueOf() : new Date().valueOf();
}

function getDanjiCount(d: ChartData[0]) {
  return d?.danji_count;
}

function getCountOne(d: ChartData[0]) {
  return d?.com_first_count;
}

function getCountTwo(d: ChartData[0]) {
  return d?.com_second_count;
}

function getCountThird(d: ChartData[0]) {
  return d?.com_third_count;
}

function getCountFourth(d: ChartData[0]) {
  return d?.com_fourth_count;
}

function getCountFifth(d: ChartData[0]) {
  return d?.com_fifth_count;
}

export const Chart = React.memo(
  ({
    width,
    xAxis,
    sl,
    danjiChartData,
    firstChartData,
    secondChartData,
    thirdChartData,
    fourthChartData,
    fifthChartData,
  }: {
    width: number;
    xAxis: MonthStartDate[];
    sl: number;
    danjiChartData: ChartData;
    firstChartData: ChartData;
    secondChartData: ChartData;
    thirdChartData: ChartData;
    fourthChartData: ChartData;
    fifthChartData: ChartData;
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

    const yScaleCount = useMemo(() => {
      const filtedDanjiData = danjiChartData.filter(
        (item) => typeof item?.danji_count === 'number' && item.danji_count >= 0,
      );

      const filtedDataOne = firstChartData.filter(
        (item) => typeof item?.com_first_count === 'number' && item.com_first_count >= 0,
      );

      const filtedDataTwo = secondChartData.filter(
        (item) => typeof item?.com_second_count === 'number' && item.com_second_count >= 0,
      );

      const filtedDataThird = thirdChartData.filter(
        (item) => typeof item?.com_third_count === 'number' && item.com_third_count >= 0,
      );

      const filtedDataFourth = fourthChartData.filter(
        (item) => typeof item?.com_fourth_count === 'number' && item.com_fourth_count >= 0,
      );

      const filtedDataFifth = fifthChartData.filter(
        (item) => typeof item?.com_fifth_count === 'number' && item.com_fifth_count >= 0,
      );

      return scaleLinear({
        domain: extent([
          ...(extent(filtedDataOne, (d) => getCountOne(d)) as number[]),
          ...(extent(filtedDataTwo, (d) => getCountTwo(d)) as number[]),
          ...(extent(filtedDataThird, (d) => getCountThird(d)) as number[]),
          ...(extent(filtedDataFourth, (d) => getCountFourth(d)) as number[]),
          ...(extent(filtedDataFifth, (d) => getCountFifth(d)) as number[]),
          ...(extent(filtedDanjiData, (d) => getDanjiCount(d)) as number[]),
        ]) as number[],
        range: [lineChartHeight - paddingVertical, paddingVertical],
      });
    }, [danjiChartData, firstChartData, secondChartData, thirdChartData, fourthChartData, fifthChartData]);

    const danjiLineChartComponent = useMemo(() => {
      if (!danjiChartData) return null;

      const memoizedData = danjiChartData.filter((d) => typeof d?.danji_count === 'number' && d.danji_count >= 0);

      return (
        <LinePath
          stroke="#FF542D"
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScaleCount(getDanjiCount(d) as number)}
        />
      );
    }, [danjiChartData, xScale, yScaleCount]);

    const comOneLineChartComponent = useMemo(() => {
      if (!firstChartData) return null;

      const memoizedData = firstChartData.filter(
        (d) => typeof d?.com_first_count === 'number' && d.com_first_count >= 0,
      );

      return (
        <LinePath
          stroke="#20C764"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScaleCount(getCountOne(d) as number)}
        />
      );
    }, [firstChartData, xScale, yScaleCount]);

    const comTwoLineChartComponent = useMemo(() => {
      if (!secondChartData) return null;

      const memoizedData = secondChartData.filter(
        (d) => typeof d?.com_second_count === 'number' && d.com_second_count >= 0,
      );

      return (
        <LinePath
          stroke="#EA2323"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScaleCount(getCountTwo(d) as number)}
        />
      );
    }, [secondChartData, xScale, yScaleCount]);

    const comThirdLineChartComponent = useMemo(() => {
      if (!thirdChartData) return null;

      const memoizedData = thirdChartData.filter(
        (d) => typeof d?.com_third_count === 'number' && d.com_third_count >= 0,
      );

      return (
        <LinePath
          stroke="#FFCD4E"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScaleCount(getCountThird(d) as number)}
        />
      );
    }, [thirdChartData, xScale, yScaleCount]);

    const comFourthLineChartComponent = useMemo(() => {
      if (!fourthChartData) return null;

      const memoizedData = fourthChartData.filter(
        (d) => typeof d?.com_fourth_count === 'number' && d.com_fourth_count >= 0,
      );

      return (
        <LinePath
          stroke="#4C6EF5"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScaleCount(getCountFourth(d) as number)}
        />
      );
    }, [fourthChartData, xScale, yScaleCount]);

    const comFifthLineChartComponent = useMemo(() => {
      if (!fifthChartData) return null;

      const memoizedData = fifthChartData.filter(
        (d) => typeof d?.com_fifth_count === 'number' && d.com_fifth_count >= 0,
      );

      return (
        <LinePath
          stroke="#7048E8"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          opacity="0.5"
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScaleCount(getCountFifth(d) as number)}
        />
      );
    }, [fifthChartData, xScale, yScaleCount]);

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
            scale={yScaleCount}
            numTicks={4}
            stroke="#E9ECEF"
            strokeOpacity="0.5"
          />
          <AxisLeft
            left={yAxisWidth}
            scale={yScaleCount}
            tickLength={8}
            tickStroke="transparent"
            strokeWidth={0}
            numTicks={4}
            tickFormat={(count) => `${count}건`}
            tickLabelProps={() => ({
              dy: '0.3em',
              fontSize: '12px',
              fontFamily: 'pretend',
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
