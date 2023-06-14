import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import React, { useMemo, useCallback, useEffect, useState } from 'react';

import { AxisLeft } from '@visx/axis';
import { localPoint } from '@visx/event';
import { GridRows } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { Bar, Line, LinePath } from '@visx/shape';
import { useTooltip } from '@visx/tooltip';
import { bisector, extent } from 'd3-array';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { toNumber } from '@/utils/toNumber';
import { formatNumberInKorean } from '@/utils';
import { DanjiChartAxisBottom } from '../../DanjiDetail/DanjiChartAxisBottom';
import { ChartTooltip } from './ChartTooltip';

const lineChartHeight = 131;
const yAxisWidth = 42;
const paddingRight = 16;
const paddingLeft = 11;
const paddingVertical = 9;

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

type DataProps = {
  sigungu_price?: number;
  sigungu_count?: number | null;

  sido_price?: number;
  sido_count?: number | null;

  danji_price?: number;
  danji_count?: number | null;

  date: Date;
  isManipulate?: boolean;
};

function getDate(d: ChartData[0]) {
  return d?.date ? new Date(d.date).valueOf() : new Date();
}

function getDanjiPrice(d: ChartData[0]) {
  return d?.danji_price;
}

function getSigunguPrice(d: ChartData[0]) {
  return d?.sigungu_price;
}

function getSidoPrice(d: ChartData[0]) {
  return d?.sido_price;
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export const Chart = React.memo(
  ({
    width,
    xAxis,
    danjiName,
    sidoName,
    sigunguName,
    danjiChartData,
    sigunguChartData,
    sidoChartData,
    sl,
    bor,
  }: {
    width: number;
    xAxis: MonthStartDate[];
    danjiName?: string;
    sidoName?: string;
    sigunguName?: string;
    danjiChartData: ChartData;
    sigunguChartData: ChartData;
    sidoChartData: ChartData;
    sl: number;
    bor?: number;
  }) => {
    const { tooltipData, tooltipLeft, showTooltip, hideTooltip } = useTooltip<DataProps>();

    const [isLineBreak, setIsLineBreak] = useState(false);

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
      const filtedSigunguData = sigunguChartData.filter((item) => item.sigungu_price && item.sigungu_price > 0);
      const filtedSidoData = sidoChartData.filter((item) => item.sido_price && item.sido_price > 0);
      const filtedDanjiData = danjiChartData.filter((item) => item.danji_price && item.danji_price > 0);

      return scaleLinear({
        domain: extent([
          ...(extent(filtedSigunguData, (d) => getSigunguPrice(d)) as number[]),
          ...(extent(filtedSidoData, (d) => getSidoPrice(d)) as number[]),
          ...(extent(filtedDanjiData, (d) => getDanjiPrice(d)) as number[]),
        ]) as number[],
        range: [lineChartHeight - paddingVertical, paddingVertical],
      });
    }, [danjiChartData, sidoChartData, sigunguChartData]);

    const bisectDate = bisector<DataProps, Date>((d) => new Date(d.date)).left;

    const handleTooltip = useCallback(
      (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        e.stopPropagation();
        const { x } = localPoint(e) || { x: 0 };

        const x0 = xScale.invert(x);
        const index = bisectDate(sigunguChartData, x0, 1);

        const cloneDanjiData = cloneDeep(danjiChartData);
        const cloneSigunguData = cloneDeep(sigunguChartData);
        const cloneSidoData = cloneDeep(sidoChartData);

        const d0 =
          index > 0
            ? Object?.assign(cloneDanjiData[index - 1], cloneSigunguData[index - 1], cloneSidoData[index - 1])
            : undefined;

        const d1 =
          sigunguChartData[index] &&
          Object?.assign(cloneDanjiData[index], cloneSigunguData[index], cloneSidoData[index]);

        let d = d0;

        if (d1 && getDate(d1) && d0) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }

        if (d) {
          if (isTouchDevice()) {
            const yValue = getDanjiPrice(d) || getSigunguPrice(d) || getSidoPrice(d);

            showTooltip({
              tooltipData: d as DataProps,
              tooltipLeft: xScale(getDate(d)) + 2,
              tooltipTop: yScalePrice(yValue || 0),
            });
          }

          const firstIndex = sigunguChartData.findIndex((item) => item.sigungu_price && item.sigungu_price > 0);

          const lastIndex =
            sigunguChartData.length -
            [...sigunguChartData].reverse().findIndex((item) => item.sigungu_price && item.sigungu_price > 0) -
            1;
          if (x < xScale(getDate(sigunguChartData[firstIndex]))) {
            const tooltipTopValue = getSigunguPrice(sigunguChartData[firstIndex]);

            showTooltip({
              tooltipData: Object?.assign(
                cloneDanjiData[firstIndex],
                cloneSigunguData[firstIndex],
                cloneSidoData[firstIndex],
              ) as DataProps,
              tooltipLeft: xScale(getDate(sigunguChartData[firstIndex])) + 2,
              tooltipTop: yScalePrice(tooltipTopValue || 0),
            });
            return;
          }
          if (x > xScale(getDate(sigunguChartData[lastIndex]))) {
            const tooltipTopValue = getSigunguPrice(sigunguChartData[lastIndex]);

            showTooltip({
              tooltipData: Object?.assign(
                cloneDanjiData[lastIndex],
                cloneSigunguData[lastIndex],
                cloneSidoData[lastIndex],
              ) as DataProps,
              tooltipLeft: xScale(getDate(sigunguChartData[lastIndex])) + 2,
              tooltipTop: yScalePrice(tooltipTopValue || 0),
            });
            return;
          }

          const nextMonth = moment(x0).add(1, 'month').startOf('month');
          const [year, month] = moment(getDate(d)).format('YYYY-M').split('-');
          const currentDate = moment(x0).format('YYYY-M');
          if (
            (year === moment(currentDate).format('YYYY') && month === moment(currentDate).format('M')) ||
            (year === nextMonth.format('YYYY') && month === nextMonth.format('M'))
          ) {
            const yValue = getSigunguPrice(d);
            showTooltip({
              tooltipData: d as DataProps,
              tooltipLeft: xScale(getDate(d)) + 2,
              tooltipTop: yScalePrice(yValue || 0),
            });
          }
        }
      },

      [sigunguChartData, danjiChartData, sidoChartData, xScale, yScalePrice, showTooltip, bisectDate],
    );

    const danjiLineChartComponent = useMemo(() => {
      if (!danjiChartData) return null;

      const memoizedData = danjiChartData.filter((d) => d.danji_price && d.danji_price > 0);

      return (
        <LinePath
          stroke="#4C6EF5"
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getDanjiPrice(d) as number)}
        />
      );
    }, [danjiChartData, xScale, yScalePrice]);

    const sigunguLineChartComponent = useMemo(() => {
      if (!sigunguChartData) return null;

      const memoizedData = sigunguChartData.filter((d) => d.sigungu_price && d.sigungu_price > 0);

      return (
        <LinePath
          stroke="#20C764"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getSigunguPrice(d) as number)}
        />
      );
    }, [sigunguChartData, xScale, yScalePrice]);

    const sidoLineChartComponent = useMemo(() => {
      if (!sidoChartData) return null;

      const memoizedData = sidoChartData.filter((d) => d.sido_price && d.sido_price > 0);

      return (
        <LinePath
          stroke="#B197FC"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getSidoPrice(d) as number)}
        />
      );
    }, [sidoChartData, xScale, yScalePrice]);

    const tickValues = useMemo(() => {
      const filtedSigunguData = sigunguChartData.filter((item) => item.sigungu_price && item.sigungu_price > 0);
      const filtedSidoData = sidoChartData.filter((item) => item.sido_price && item.sido_price > 0);
      const filtedDanjiData = danjiChartData.filter((item) => item.danji_price && item.danji_price > 0);

      const lowerUpperBound = extent([
        ...(extent(filtedSigunguData, (d) => getSigunguPrice(d)) as number[]),
        ...(extent(filtedSidoData, (d) => getSidoPrice(d)) as number[]),
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
    }, [danjiChartData, sidoChartData, sigunguChartData]);

    useEffect(() => {
      hideTooltip();
    }, [bor, hideTooltip, sl]);

    return (
      <div
        style={{
          position: 'relative',
          marginTop: tooltipData ? (isLineBreak ? '100px' : '100px') : '12px',
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

              if (Number(price) < 10000000) {
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

          {sidoLineChartComponent}
          {sigunguLineChartComponent}
          {danjiLineChartComponent}
          {tooltipData && tooltipData?.sigungu_price && tooltipData.sigungu_price > 0 && (
            <g>
              <Line
                from={{
                  x: tooltipLeft ? tooltipLeft - 2 : tooltipLeft,
                  y: 0,
                }}
                to={{
                  x: tooltipLeft ? tooltipLeft - 2 : tooltipLeft,
                  y: lineChartHeight + 36,
                }}
                stroke="#212529"
                strokeWidth={1}
                pointerEvents="none"
              />
            </g>
          )}
          <Bar
            key="year-transparent"
            width={width - yAxisWidth <= 0 ? 0 : width - yAxisWidth}
            x={yAxisWidth}
            y={0}
            height={lineChartHeight}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            fill="transparent"
          />
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
        {tooltipData && (
          <ChartTooltip
            width={width}
            left={tooltipLeft ? tooltipLeft - 2 : tooltipLeft}
            data={tooltipData}
            danjiName={danjiName}
            sidoName={sidoName}
            sigunguName={sigunguName}
            setIsLineBreak={setIsLineBreak}
          />
        )}
      </div>
    );
  },
);
