import { memo } from 'react';

import { customAlphabet } from 'nanoid';

import { AxisLeft } from '@visx/axis';

import { GridRows } from '@visx/grid';

import { Bar, Line } from '@visx/shape';

import { BuyOrRent } from '@/constants/enums';

import { toNumber } from '@/utils/toNumber';

import { BarChartProps } from './chartTypes';

import { getDate, getBuyCount, getJeonsaeCount } from './utils/chart';

const BarChart = memo(
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
  }: BarChartProps) => {
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
                    fill={
                      !!item.buy_count &&
                      !!tooltipData?.buy_count &&
                      item.buy_price === tooltipData?.buy_price &&
                      item.date === tooltipData?.date
                        ? '#7950F2'
                        : '#bbb'
                    }
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
                    fill={
                      // tooltipData
                      !!item.jeonsae_count &&
                      !!tooltipData?.jeonsae_count &&
                      item.jeonsae_price === tooltipData?.jeonsae_price &&
                      item.date === tooltipData?.date
                        ? '#FF542D'
                        : '#bbb'
                    }
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

export default memo(BarChart);
