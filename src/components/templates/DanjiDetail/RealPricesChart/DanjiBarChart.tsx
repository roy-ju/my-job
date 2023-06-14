import { customAlphabet } from 'nanoid';
import React from 'react';
import { AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { Bar, Line } from '@visx/shape';
import { ScaleLinear, ScaleTime } from 'd3';

import { BuyOrRent } from '@/constants/enums';
import { toNumber } from '@/utils/toNumber';

type ChartData = {
  date: Date;
  buy_price?: number;
  jeonsae_price?: number;
  buy_count?: number;
  jeonsae_count?: number;
}[];

type DataProps = {
  buy_price?: number;
  jeonsae_price?: number;
  buy_count?: number;
  jeonsae_count?: number;
  date: Date;
};

function getDate(d: ChartData[0]) {
  return new Date(d.date).valueOf();
}

function getBuyCount(d: ChartData[0]) {
  return d.buy_count;
}

function getJeonsaeCount(d: ChartData[0]) {
  return d.jeonsae_count;
}

const DanjiBarChart = React.memo(
  ({
    data,
    buyOrRent,
    width,
    yAxisWidth,
    barChartHeight,
    renderNodata,
    xScale,
    yScaleCount,
    tooltipLeft,
    tooltipData,
    handleTooltip,
  }: {
    data: ChartData;
    buyOrRent?: number;
    width: number;
    yAxisWidth: number;
    barChartHeight: number;
    renderNodata: boolean;
    xScale: ScaleTime<number, number, never>;
    yScaleCount: ScaleLinear<number, number, never>;
    tooltipLeft?: number;
    tooltipData?: DataProps;
    handleTooltip: (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => void;
  }) => {
    const nanoid = customAlphabet('1234567890abcdef', 10);

    return (
      <svg width={width} height={barChartHeight}>
        <line
          x1={yAxisWidth - 1}
          x2={yAxisWidth - 1}
          y1={0}
          y2={barChartHeight}
          style={{
            stroke: '#C2C2C2',
            strokeWidth: 1,
          }}
        />
        <rect x={yAxisWidth} y={0} width={width} height={barChartHeight} fill="transparent" />
        <GridRows
          width={width - yAxisWidth}
          left={yAxisWidth}
          scale={yScaleCount}
          numTicks={2}
          stroke="#E1E1E1"
          strokeOpacity="0.5"
        />

        {!renderNodata && (
          <AxisLeft
            scale={yScaleCount}
            left={yAxisWidth}
            tickLength={8}
            tickStroke="transparent"
            strokeWidth={0}
            numTicks={2}
            hideZero
            tickFormat={(count) => `${Math.floor(toNumber(count))}건`}
            tickLabelProps={() => ({
              dy: '0.3em',
              fontSize: '12px',
              fontWeight: 400,
              fill: '#868E96',
              textAnchor: 'end',
            })}
          />
        )}

        {buyOrRent === BuyOrRent.Buy && (
          <>
            {data
              .filter((item) => item.buy_count && item.buy_count > 0)
              .map((item) => {
                const date = getDate(item);
                const barWidth = 4;

                const barHeight = barChartHeight - 3 - (yScaleCount(getBuyCount(item) as number) ?? 0);
                const barX = xScale(date);
                const barY = barChartHeight - 3 - barHeight;

                return (
                  <Bar
                    key={`buy-bar-${date}-${nanoid()}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="#7950F2"
                  />
                );
              })}
          </>
        )}

        {buyOrRent !== BuyOrRent.Buy && (
          <>
            {data
              .filter((item) => item.jeonsae_count && item.jeonsae_count > 0)
              .map((item) => {
                const date = getDate(item);
                const barWidth = 4;
                const barHeight = barChartHeight - 3 - (yScaleCount(getJeonsaeCount(item) as number) ?? 0);
                const barX = xScale(date);
                const barY = barChartHeight - 3 - barHeight;

                return (
                  <Bar
                    key={`jeonsae-bar-${date}-${nanoid()}`}
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barHeight}
                    fill="#FF542D"
                  />
                );
              })}
          </>
        )}

        {/* 투명 그래프 */}
        {buyOrRent !== BuyOrRent.Buy && (
          <>
            <>
              <Bar
                key="jeonsae-bottom-transparent"
                width={width - yAxisWidth <= 0 ? 0 : width - yAxisWidth}
                x={yAxisWidth}
                y={0}
                height={barChartHeight}
                fill="transparent"
                onTouchStart={handleTooltip}
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}
              />
            </>
          </>
        )}

        {buyOrRent === BuyOrRent.Buy && (
          <>
            <>
              <Bar
                key="buy-bottom-transparent"
                width={width - yAxisWidth <= 0 ? 0 : width - yAxisWidth}
                x={yAxisWidth}
                y={0}
                height={barChartHeight}
                fill="transparent"
                onTouchStart={handleTooltip}
                onTouchMove={handleTooltip}
                onMouseMove={handleTooltip}
              />
            </>
          </>
        )}

        {buyOrRent === BuyOrRent.Buy && tooltipData && tooltipData?.buy_price && tooltipData.buy_price > 0 && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: barChartHeight + 0 }}
              stroke="#212529"
              strokeWidth={1}
              pointerEvents="none"
            />
          </g>
        )}

        {buyOrRent !== BuyOrRent.Buy && tooltipData && tooltipData?.jeonsae_price && tooltipData.jeonsae_price > 0 && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: barChartHeight + 0 }}
              stroke="#212529"
              strokeWidth={1}
              pointerEvents="none"
            />
          </g>
        )}
      </svg>
    );
  },
);

export default DanjiBarChart;
