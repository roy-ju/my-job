import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import React, { useMemo, useCallback, useEffect } from 'react';

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
  value_price?: number;
  value_count?: number | null;

  danji_price?: number;
  danji_count?: number | null;

  date: Date;
  isManipulate?: boolean;
}[];

type DataProps = {
  value_price?: number;
  value_count?: number | null;

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

function getValuePrice(d: ChartData[0]) {
  return d?.value_price;
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export const Chart = React.memo(
  ({
    width,
    xAxis,
    trandsactionData,
    valuesData,
    sl,
    bor,
  }: {
    width: number;
    xAxis: MonthStartDate[];
    trandsactionData: ChartData;
    valuesData: ChartData;
    sl: number;
    bor?: number;
  }) => {
    const { tooltipData, tooltipLeft, showTooltip, hideTooltip } = useTooltip<DataProps>();

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
      const filtedTransactionData = trandsactionData.filter((item) => item.danji_price && item.danji_price > 0);
      const filtedValueData = valuesData.filter((item) => item.value_price && item.value_price > 0);

      return scaleLinear({
        domain: extent([
          ...(extent(filtedTransactionData, (d) => getDanjiPrice(d)) as number[]),
          ...(extent(filtedValueData, (d) => getValuePrice(d)) as number[]),
        ]) as number[],
        range: [lineChartHeight - paddingVertical, paddingVertical],
      });
    }, [trandsactionData, valuesData]);

    const bisectDate = bisector<DataProps, Date>((d) => new Date(d.date)).left;

    const handleTooltip = useCallback(
      (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        e.stopPropagation();
        const { x } = localPoint(e) || { x: 0 };

        const x0 = xScale.invert(x);
        const index = bisectDate(valuesData, x0, 1);

        const cloneTransactionData = cloneDeep(trandsactionData);
        const cloneValueData = cloneDeep(valuesData);

        const d0 = Object?.assign(cloneTransactionData[index - 1], cloneValueData[index - 1]);

        const d1 = cloneValueData[index] && Object?.assign(cloneTransactionData[index], cloneValueData[index]);

        let d = d0;

        if (d1 && getDate(d1)) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }

        if (d) {
          if (isTouchDevice()) {
            const yValue = getDanjiPrice(d) || getValuePrice(d);
            showTooltip({
              tooltipData: d as DataProps,
              tooltipLeft: xScale(getDate(d)) + 2,
              tooltipTop: yScalePrice(yValue || 0),
            });
          }

          const firstIndex = valuesData.findIndex((item) => item.value_price && item.value_price >= 0);

          const lastIndex =
            valuesData.length -
            [...valuesData].reverse().findIndex((item) => item.value_price && item.value_price > 0) -
            1;

          if (x < xScale(getDate(valuesData[firstIndex]))) {
            const tooltipTopValue = getValuePrice(valuesData[firstIndex]);

            showTooltip({
              tooltipData: Object?.assign(cloneTransactionData[firstIndex], cloneValueData[firstIndex]) as DataProps,
              tooltipLeft: xScale(getDate(valuesData[firstIndex])) + 2,
              tooltipTop: yScalePrice(tooltipTopValue || 0),
            });
            return;
          }
          if (x > xScale(getDate(valuesData[lastIndex]))) {
            const tooltipTopValue = getValuePrice(valuesData[lastIndex]);

            showTooltip({
              tooltipData: Object?.assign(cloneTransactionData[lastIndex], cloneValueData[lastIndex]) as DataProps,
              tooltipLeft: xScale(getDate(valuesData[lastIndex])) + 2,
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
            const yValue = getValuePrice(d);
            showTooltip({
              tooltipData: d as DataProps,
              tooltipLeft: xScale(getDate(d)) + 2,
              tooltipTop: yScalePrice(yValue || 0),
            });
          }
        }
      },

      [valuesData, trandsactionData, xScale, yScalePrice, showTooltip, bisectDate],
    );

    const transactionLineChartComponent = useMemo(() => {
      if (!trandsactionData) return null;

      const memoizedData = trandsactionData.filter((d) => d.danji_price && d.danji_price > 0);

      return (
        <LinePath
          stroke="#FF542D"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getDanjiPrice(d) as number)}
        />
      );
    }, [trandsactionData, xScale, yScalePrice]);

    const valueLineChartComponent = useMemo(() => {
      if (!valuesData) return null;

      const memoizedData = valuesData.filter((d) => d.value_price && d.value_price > 0);

      return (
        <LinePath
          stroke="#4C6EF5"
          strokeDasharray={4}
          strokeWidth={2}
          data={memoizedData}
          x={(d) => xScale(getDate(d)) ?? 0}
          y={(d) => yScalePrice(getValuePrice(d) as number)}
        />
      );
    }, [valuesData, xScale, yScalePrice]);

    const tickValues = useMemo(() => {
      const filtedTransactionData = trandsactionData.filter((item) => item.danji_price && item.danji_price > 0);
      const filtedValueData = valuesData.filter((item) => item.value_price && item.value_price > 0);

      const lowerUpperBound = extent([
        ...(extent(filtedTransactionData, (d) => getDanjiPrice(d)) as number[]),
        ...(extent(filtedValueData, (d) => getValuePrice(d)) as number[]),
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
    }, [trandsactionData, valuesData]);

    useEffect(() => {
      hideTooltip();
    }, [bor, hideTooltip, sl]);

    return (
      <div
        style={{
          position: 'relative',
          marginTop: tooltipData ? '80px' : '12px',
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
              fontFamily: 'pretend',
              fontWeight: 400,
              fill: '#868E96',
              textAnchor: 'end',
            })}
          />

          {transactionLineChartComponent}
          {valueLineChartComponent}
          {tooltipData && tooltipData?.value_price && tooltipData.value_price > 0 && (
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
            key="cross-year-transparent"
            width={width - yAxisWidth}
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
          <ChartTooltip width={width} left={tooltipLeft ? tooltipLeft - 2 : tooltipLeft} data={tooltipData} />
        )}
      </div>
    );
  },
);
