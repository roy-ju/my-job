import React, { useMemo } from 'react';

import { extent } from 'd3-array';

import { AxisLeft } from '@visx/axis';

import { GridRows } from '@visx/grid';

import { scaleLinear, scaleTime } from '@visx/scale';

import { Circle, LinePath } from '@visx/shape';

import { toNumber } from '@/utils/toNumber';

import { formatNumberInKorean } from '@/utils';

import {
  lineChartHeight as buyLineChartHeight,
  getDanjiPrice,
  getDate,
  getSidoPrice,
  getSigunguPrice,
  paddingLeft,
  paddingRight,
  paddingVertical,
  yAxisWidth,
} from './utils/chart';

import { TransactionPerAreaChartProps } from './chartTypes';

import AxisBottom from './AxisBottom';

const lineChartHeight = buyLineChartHeight;

const TransactionPerAreaChart = React.memo(
  ({
    width = 0,
    xAxis,
    danjiChartData,
    sigunguChartData,
    sidoChartData,
    selectedYear,
  }: TransactionPerAreaChartProps) => {
    const xScale = useMemo(
      () =>
        scaleTime({
          domain: [
            new Date(xAxis[0].date.getFullYear(), xAxis[0].date.getMonth() - 1),
            new Date(xAxis[xAxis.length - 1].date.getFullYear(), xAxis[xAxis.length - 1].date.getMonth() - 1),
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

    const danjiCircles = useMemo(() => {
      if (!danjiChartData) return null;

      return danjiChartData
        .filter((v) => v.danji_count && v.danji_count > 0)
        .map((d) => {
          const cx = xScale(getDate(d));
          const cy = yScalePrice(getDanjiPrice(d) as number);
          return (
            <Circle
              key={`${d.date}`}
              cx={cx}
              cy={cy}
              r={2}
              fill="white"
              stroke="#FF542D"
              strokeWidth={1}
              pointerEvents="none"
            />
          );
        });
    }, [danjiChartData, xScale, yScalePrice]);

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

    return (
      <div>
        <div style={{ position: 'relative' }}>
          <svg width={width} height={lineChartHeight}>
            <line
              x1={yAxisWidth - 1.5}
              x2={width}
              y1={lineChartHeight}
              y2={lineChartHeight}
              style={{ stroke: '#C2C2C2', strokeWidth: 2 }}
            />
            <line
              x1={yAxisWidth - 1}
              x2={yAxisWidth - 1}
              y1={0}
              y2={lineChartHeight}
              style={{ stroke: '#C2C2C2', strokeWidth: 1 }}
            />

            <GridRows
              width={width - yAxisWidth}
              left={yAxisWidth}
              scale={yScalePrice}
              tickValues={tickValues}
              stroke="#E1E1E1"
              strokeOpacity="0.5"
            />

            <AxisLeft
              left={yAxisWidth}
              scale={yScalePrice}
              tickLength={8}
              tickStroke="transparent"
              strokeWidth={0}
              tickValues={tickValues}
              tickFormat={(price) => {
                if (price ?? 0 < 10000000) {
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

            <LinePath
              stroke="#FFCD4E"
              strokeDasharray={4}
              strokeWidth={2}
              data={sigunguChartData.filter((d) => d.sigungu_price && d.sigungu_price > 0)}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScalePrice(getSigunguPrice(d) as number)}
            />

            <LinePath
              stroke="#FFB798"
              strokeDasharray={4}
              strokeWidth={2}
              data={sidoChartData.filter((d) => d.sido_price && d.sido_price > 0)}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScalePrice(getSidoPrice(d) as number)}
            />

            <LinePath
              stroke="#FF542D"
              strokeWidth={2}
              data={danjiChartData.filter((d) => d.danji_price && d.danji_price > 0)}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScalePrice(getDanjiPrice(d) as number)}
            />

            {danjiCircles}
          </svg>

          <div style={{ position: 'absolute', bottom: -20 }}>
            <AxisBottom
              width={width}
              paddingLeft={paddingLeft}
              xScale={xScale}
              selectedYear={selectedYear}
              xAxis={xAxis}
            />
          </div>
        </div>
      </div>
    );
  },
);

export default TransactionPerAreaChart;
