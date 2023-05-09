import { AxisLeft } from '@visx/axis';
import * as allCurves from '@visx/curve';
import { GridRows } from '@visx/grid';
import { LinePath, Bar, Line, Circle } from '@visx/shape';
import { ScaleLinear, ScaleTime } from 'd3';
import React, { useMemo } from 'react';

import { BuyOrRent } from '@/constants/enums';
import { formatTickLabel } from '@/utils/chart';
import { customAlphabet } from 'nanoid';

type ChartData = {
  date: Date;
  buy_price?: number;
  jeonsae_price?: number;
  buy_count?: number;
  jeonsae_count?: number;
  buy_prices?: null | number[];
  jeonsae_prices?: null | number[];
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

function getBuyPrice(d: ChartData[0]) {
  return d.buy_price;
}

function getBuyPrices(d: number) {
  return d;
}

function getJeonsaePrice(d: ChartData[0]) {
  return d.jeonsae_price;
}

function getJeonsaePrices(d: number) {
  return d;
}

const DanjiLineChart = React.memo(
  ({
    data,
    buyOrRent,
    width,
    yAxisWidth,
    lineChartHeight,
    renderNodata,
    xScale,
    yScalePrice,
    tickValues,
    tooltipLeft,
    tooltipData,
    tooltipTop,
    handleTooltip,
  }: {
    data: ChartData;
    buyOrRent?: number;
    width: number;
    yAxisWidth: number;
    lineChartHeight: number;
    renderNodata: boolean;
    xScale: ScaleTime<number, number, never>;
    yScalePrice: ScaleLinear<number, number, never>;
    tickValues: number[];
    tooltipLeft?: number;
    tooltipData?: DataProps;
    tooltipTop: number;
    handleTooltip: (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => void;
  }) => {
    const nanoid = customAlphabet('0123456789abcedefgh', 10);

    const BuyCircles = useMemo(() => {
      if (buyOrRent !== BuyOrRent.Buy) return null;
      if (!data) return null;

      return data
        .filter((v) => v.buy_prices && v.buy_prices.length > 0)
        .map((d) =>
          d.buy_prices?.map((v) => {
            const cx = xScale(getDate(d)) + 1.9;
            const cy = yScalePrice(getBuyPrices(Math.abs(v)) as number);
            return (
              <Circle
                key={`circle-${nanoid()}`}
                cx={cx}
                cy={cy}
                r={3}
                fill={v > 0 ? '#D0BFFF' : '#FFFFFF'}
                pointerEvents="none"
              />
            );
          }),
        );
    }, [buyOrRent, data, xScale, yScalePrice, nanoid]);

    const JeonsaeCircles = useMemo(() => {
      if (buyOrRent === BuyOrRent.Buy) return null;
      if (!data) return null;

      return data
        .filter((v) => v.jeonsae_prices && v.jeonsae_prices.length > 0)
        .map((d) =>
          d.jeonsae_prices?.map((v) => {
            const cx = xScale(getDate(d)) + 1.9;
            const cy = yScalePrice(getJeonsaePrices(Math.abs(v)) as number);
            return (
              <Circle
                key={`circle-${nanoid()}`}
                cx={cx}
                cy={cy}
                r={3}
                fill={v > 0 ? '#FFD4C1' : '#B4F1CC'}
                pointerEvents="none"
              />
            );
          }),
        );
    }, [buyOrRent, data, xScale, yScalePrice, nanoid]);

    const LineChartComponent = useMemo(() => {
      if (!data) return null;

      if (buyOrRent === BuyOrRent.Buy) {
        const memoizedData = data.filter((d) => d.buy_price && d.buy_price > 0);

        return (
          <LinePath
            stroke="#7950F2"
            strokeWidth={2}
            data={memoizedData}
            curve={allCurves.curveCardinal}
            x={(d) => xScale(getDate(d))}
            y={(d) => yScalePrice(getBuyPrice(d) as number)}
            pointerEvents="none"
          />
        );
      }

      const memoizedData = data.filter((d) => d.jeonsae_price && d.jeonsae_price > 0);
      return (
        <LinePath
          stroke="#FF542D"
          strokeWidth={2}
          data={memoizedData}
          curve={allCurves.curveCardinal}
          x={(d) => xScale(getDate(d))}
          y={(d) => yScalePrice(getJeonsaePrice(d) as number)}
          pointerEvents="none"
        />
      );
    }, [data, buyOrRent, xScale, yScalePrice]);

    if (!width || width === 0) return null;

    return (
      <svg width={width} height={lineChartHeight}>
        <line
          x1={yAxisWidth - 1}
          x2={yAxisWidth - 1}
          y1={0}
          y2={lineChartHeight}
          style={{ stroke: '#C2C2C2', strokeWidth: 1 }}
        />

        {tickValues && tickValues.filter((item) => item > 0).length >= 1 && (
          <GridRows
            width={width - yAxisWidth}
            left={yAxisWidth}
            scale={yScalePrice}
            tickValues={tickValues}
            stroke="#E1E1E1"
            strokeOpacity="0.5"
          />
        )}

        {!renderNodata && (
          <AxisLeft
            left={yAxisWidth}
            scale={yScalePrice}
            tickValues={tickValues}
            tickLength={8}
            tickStroke="transparent"
            strokeWidth={0}
            tickFormat={(price) => formatTickLabel(price, tickValues)}
            tickLabelProps={() => ({
              dy: '0.3em',
              fontSize: '12px',
              // fontFamily: 'pretend',
              fontWeight: 400,
              fill: '#868E96',
              textAnchor: 'end',
            })}
          />
        )}

        {buyOrRent === BuyOrRent.Buy && (
          <>
            {BuyCircles}
            {LineChartComponent}
            <Bar
              key="buy-top-transparent"
              width={width - yAxisWidth}
              x={yAxisWidth}
              y={0}
              height={lineChartHeight}
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              fill="transparent"
            />
          </>
        )}

        {buyOrRent !== BuyOrRent.Buy && (
          <>
            {JeonsaeCircles}
            {LineChartComponent}
            <Bar
              key="jeonsae-top-transparent"
              width={width - yAxisWidth}
              x={yAxisWidth}
              y={0}
              height={lineChartHeight}
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              fill="transparent"
            />
          </>
        )}

        {buyOrRent === BuyOrRent.Buy && tooltipData && tooltipData?.buy_price && tooltipData.buy_price > 0 && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: lineChartHeight + 36 }}
              stroke="#212529"
              strokeWidth={1}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={3}
              strokeWidth={2}
              stroke="#7950F2"
              fill="white"
              pointerEvents="none"
            />
          </g>
        )}

        {buyOrRent !== BuyOrRent.Buy && tooltipData && tooltipData?.jeonsae_price && tooltipData.jeonsae_price > 0 && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: lineChartHeight + 36 }}
              stroke="#212529"
              strokeWidth={1}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={3}
              strokeWidth={2}
              stroke="#FF542D"
              fill="white"
              pointerEvents="none"
            />
          </g>
        )}
      </svg>
    );
  },
);

export default DanjiLineChart;
