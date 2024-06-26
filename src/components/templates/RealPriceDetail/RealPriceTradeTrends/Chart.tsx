import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import React, { useMemo, useCallback, useEffect, useState } from 'react';

import { AxisLeft } from '@visx/axis';
import { localPoint } from '@visx/event';
import { GridRows } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { Bar, Line, LinePath } from '@visx/shape';
import { useTooltip } from '@visx/tooltip';
import { bisector, extent } from 'd3-array';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import { customAlphabet } from 'nanoid';
import { DanjiChartAxisBottom } from '../../DanjiDetail/DanjiChartAxisBottom';
import { ChartTooltip } from './ChartTooltip';

const barChartHeight = 131;

const lineChartHeight = 131;
const yAxisWidth = 42;
const paddingRight = 16;
const paddingLeft = 11;
const paddingVertical = 9;

type ChartData = {
  sigungu_count?: number | null;
  sido_count?: number | null;
  danji_count?: number | null;
  date: Date;
  isManipulate?: boolean;
}[];

type DataProps = {
  sigungu_count?: number | null;
  sido_count?: number | null;
  danji_count?: number | null;
  date: Date;
  isManipulate?: boolean;
};

function getDate(d: ChartData[0]) {
  return d?.date ? new Date(d.date).valueOf() : new Date().valueOf();
}

function getDanjiCount(d: ChartData[0]) {
  return d?.danji_count || 0;
}

function getSigunguCount(d: ChartData[0]) {
  return d?.sigungu_count || 0;
}

function getSidoCount(d: ChartData[0]) {
  return d?.sido_count || 0;
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
    const nanoid = customAlphabet('1234567890abcdef', 10);
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

    const yScaleCount = useMemo(() => {
      const filtedSigunguData = sigunguChartData.filter(
        (item) => typeof item?.sigungu_count === 'number' && item.sigungu_count >= 0,
      );
      const filtedSidoData = sidoChartData.filter(
        (item) => typeof item?.sido_count === 'number' && item.sido_count >= 0,
      );
      const filtedDanjiData = danjiChartData.filter(
        (item) => typeof item?.danji_count === 'number' && item.danji_count >= 0,
      );

      return scaleLinear({
        domain: extent([
          ...(extent(filtedSigunguData, (d) => getSigunguCount(d)) as number[]),
          ...(extent(filtedSidoData, (d) => getSidoCount(d)) as number[]),
          ...(extent(filtedDanjiData, (d) => getDanjiCount(d)) as number[]),
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

        const d0 = Object?.assign(cloneDanjiData[index - 1], cloneSigunguData[index - 1], cloneSidoData[index - 1]);

        const d1 =
          sigunguChartData[index] &&
          Object?.assign(cloneDanjiData[index], cloneSigunguData[index], cloneSidoData[index]);

        let d = d0;

        if (d1 && getDate(d1)) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }

        if (d) {
          if (isTouchDevice()) {
            const yValue = getDanjiCount(d) || getSidoCount(d) || getSigunguCount(d);
            showTooltip({
              tooltipData: d as DataProps,
              tooltipLeft: xScale(getDate(d)) + 2,
              tooltipTop: yScaleCount(yValue || 0),
            });
          }

          const firstIndex = sigunguChartData.findIndex(
            (item) => typeof item.sigungu_count === 'number' && item.sigungu_count >= 0,
          );

          const lastIndex =
            sigunguChartData.length -
            [...sigunguChartData]
              .reverse()
              .findIndex((item) => typeof item.sigungu_count === 'number' && item.sigungu_count >= 0) -
            1;

          if (x < xScale(getDate(sigunguChartData[firstIndex]))) {
            const tooltipTopValue = getSigunguCount(sigunguChartData[firstIndex]);
            showTooltip({
              tooltipData: Object?.assign(
                cloneDanjiData[firstIndex] ? cloneDanjiData[firstIndex] : {},
                cloneSigunguData[firstIndex] ? cloneSigunguData[firstIndex] : {},
                cloneSidoData[firstIndex] ? cloneSidoData[firstIndex] : {},
              ) as DataProps,
              tooltipLeft: xScale(getDate(sigunguChartData[firstIndex])) + 2,
              tooltipTop: yScaleCount(tooltipTopValue || 0),
            });
            return;
          }

          if (x > xScale(getDate(sigunguChartData[lastIndex]))) {
            const tooltipTopValue = getSigunguCount(sigunguChartData[lastIndex]);

            showTooltip({
              tooltipData: Object?.assign(
                cloneDanjiData[lastIndex] ? cloneDanjiData[lastIndex] : {},
                cloneSigunguData[lastIndex] ? cloneSigunguData[lastIndex] : {},
                cloneSidoData[lastIndex] ? cloneSidoData[lastIndex] : {},
              ) as DataProps,
              tooltipLeft: xScale(getDate(sigunguChartData[lastIndex])) + 2,
              tooltipTop: yScaleCount(tooltipTopValue || 0),
            });
            return;
          }

          const nextMonth = moment(x0).add(1, 'month').startOf('month');
          const [year, month] = moment(getDate(d)).format('YYYY-M').split('-');
          const currentDate = moment(x0).format('YYYY-MM');
          if (
            (year === moment(currentDate).format('YYYY') && month === moment(currentDate).format('M')) ||
            (year === nextMonth.format('YYYY') && month === nextMonth.format('M'))
          ) {
            const yValue = getSigunguCount(d);
            showTooltip({
              tooltipData: d as DataProps,
              tooltipLeft: xScale(getDate(d)) + 2,
              tooltipTop: yScaleCount(yValue || 0),
            });
          }
        }
      },

      [sigunguChartData, danjiChartData, sidoChartData, xScale, yScaleCount, showTooltip, bisectDate],
    );

    // const danjiLineChartComponent = useMemo(() => {
    //   if (!danjiChartData) return null;

    //   const memoizedData = danjiChartData.filter((d) => typeof d?.danji_count === 'number' && d.danji_count > 0);

    //   return (
    //     <LinePath
    //       stroke="#FF542D"
    //       strokeWidth={2}
    //       data={memoizedData}
    //       x={(d) => xScale(getDate(d)) ?? 0}
    //       y={(d) => yScaleCount(getDanjiCount(d) as number)}
    //     />
    //   );
    // }, [danjiChartData, xScale, yScaleCount]);

    const sigunguLineChartComponent = useMemo(() => {
      if (!sigunguChartData) return null;

      const memoizedData = sigunguChartData.filter((d) => typeof d?.sigungu_count === 'number' && d.sigungu_count >= 0);

      return (
        <LinePath
          stroke="#FFCD4E"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScaleCount(getSigunguCount(d) as number)}
        />
      );
    }, [sigunguChartData, xScale, yScaleCount]);

    const sidoLineChartComponent = useMemo(() => {
      if (!sidoChartData) return null;

      const memoizedData = sidoChartData.filter((d) => typeof d?.sido_count === 'number' && d.sido_count >= 0);

      return (
        <LinePath
          stroke="#FFB798"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScaleCount(getSidoCount(d) as number)}
        />
      );
    }, [sidoChartData, xScale, yScaleCount]);

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
            tickFormat={(count) => `${count}`}
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
          {/* {danjiLineChartComponent} */}
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
                  key={`totalTrade-bar-${date}-${nanoid()}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="#FF542D"
                />
              );
            })}
          {tooltipData && (
            <g>
              <Line
                from={{
                  x: tooltipLeft,
                  y: 0,
                }}
                to={{
                  x: tooltipLeft,
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
