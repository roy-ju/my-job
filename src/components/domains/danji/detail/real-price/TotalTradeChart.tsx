import { useMemo, memo } from 'react';

import dynamic from 'next/dynamic';

import { AxisLeft } from '@visx/axis';

import { GridRows } from '@visx/grid';

import { scaleLinear, scaleTime } from '@visx/scale';

import { toNumber } from '@/utils/toNumber';

import { customAlphabet } from 'nanoid';

import { Bar } from '@visx/shape';

import {
  totalTradeBarChartHeight as barChartHeight,
  getDanjiCount,
  getDate,
  paddingLeft,
  paddingRight,
  paddingVertical,
  yAxisWidth,
} from './utils/chart';

import { TotalTradeChartProps } from './chartTypes';

const AxisBottom = dynamic(() => import('./AxisBottom'), { ssr: false });

const TotalTradeChart = memo(({ width = 0, xAxis, danjiChartData, selectedYear }: TotalTradeChartProps) => {
  const nanoid = customAlphabet('1234567890abcdef', 10);

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

  const yScaleCount = useMemo(
    () =>
      scaleLinear({
        domain: [0, Math.max(...danjiChartData.map((item) => item.danji_count ?? 0))],
        range: [barChartHeight - paddingVertical, paddingVertical],
      }),
    [danjiChartData],
  );

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <svg width={width} height={barChartHeight}>
          <line
            x1={yAxisWidth - 1.5}
            x2={width}
            y1={barChartHeight}
            y2={barChartHeight}
            style={{ stroke: '#C2C2C2', strokeWidth: 2 }}
          />
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

          <GridRows
            width={width - yAxisWidth}
            left={yAxisWidth}
            scale={yScaleCount}
            numTicks={2}
            stroke="#E1E1E1"
            strokeOpacity="0.5"
          />

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

          {danjiChartData
            .filter((item) => item.danji_count && item.danji_count > 0)
            .map((item) => {
              const date = getDate(item);
              const barWidth = 4;
              const barHeight = barChartHeight - 3 - (yScaleCount(getDanjiCount(item) as number) ?? 0);
              const barX = xScale(date);
              const barY = barChartHeight - barHeight;

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
});

export default TotalTradeChart;
