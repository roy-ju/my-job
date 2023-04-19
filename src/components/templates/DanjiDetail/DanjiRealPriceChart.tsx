/* eslint-disable consistent-return */
import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import { BuyOrRent } from '@/constants/enums';
import { toNumber } from '@/utils/toNumber';
import { localPoint } from '@visx/event';
import { scaleLinear, scaleTime } from '@visx/scale';
import { useTooltip } from '@visx/tooltip';
import { bisector, extent } from 'd3-array';
import moment from 'moment';
import React, { useRef, Touch, useMemo, useCallback, useEffect } from 'react';
import tw from 'twin.macro';
import { DanjiChartAxisBottomWithLine } from './DanjiChartAxisBottomWithLine';
import DanjiBarChart from './RealPricesChart/DanjiBarChart';
import DanjiChartTooltip from './RealPricesChart/DanjiChartTooltip';
import DanjiLineChart from './RealPricesChart/DanjiLineChart';

type ChartData = {
  buy_price?: number;
  jeonsae_price?: number;
  buy_count?: number;
  jeonsae_count?: number;
  date: Date;
  buy_prices?: null | number[];
  jeonsae_prices?: null | number[];
  buy_domain_prices?: number;
  jeonsae_domain_prices?: number;
}[];

type DataProps = {
  buy_price?: number;
  jeonsae_price?: number;
  buy_count?: number;
  jeonsae_count?: number;
  date: Date;
  buy_prices?: null | number[];
  jeonsae_prices?: null | number[];
};

export type RealPriceChartProps = {
  width: number;
  pnu?: string;
  buyOrRent: number;
  checked: boolean;
  selectedYear: number;
  selectedIndex?: number;
  realPricesPyoungList: GetDanjiRealPricesPyoungListResponse['list'] | [];
  rt?: number;
};

const lineChartHeight = 160;
const barChartHeight = 60;
const yAxisWidth = 42;
const paddingRight = 16;
const paddingLeft = 11;
const paddingVertical = 9;

function getDate(d: ChartData[0]) {
  return d?.date ? new Date(d.date).valueOf() : new Date().valueOf();
}

function getBuyPrice(d: ChartData[0]) {
  return d?.buy_price;
}

function getJeonsaePrice(d: ChartData[0]) {
  return d?.jeonsae_price;
}

function getYPriceDomainPrices(d1?: number, d2?: number[] | null) {
  if (!d1) return;
  if (!d2) return d1;

  const d2maxPrices = Math.max(...d2.map((item) => Math.abs(item)));

  const maxPrices = Math.max(d1, d2maxPrices);

  return maxPrices;
}

function getYPriceDomainMinPrices(d1?: number, d2?: number[] | null) {
  if (!d1) return;
  if (!d2) return d1;

  const d2minPrices = Math.min(...d2.map((item) => Math.abs(item)));

  const minPrices = Math.min(d1, d2minPrices);

  return minPrices;
}

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export const DanjiRealPriceChart = React.memo(
  ({
    width = 0,
    xAxis,
    buyOrRent,
    selectedYear,
    selectedIndex,
    realpricesChartData,
    checked,
  }: {
    width?: number;
    xAxis: MonthStartDate[];
    buyOrRent?: number;
    selectedYear: number;
    selectedIndex?: number;
    realpricesChartData: ChartData;
    checked?: boolean;
  }) => {
    const lastTouchRef = useRef<Touch | null>(null);
    const { tooltipData, tooltipLeft, tooltipTop = 0, showTooltip, hideTooltip } = useTooltip<DataProps>();

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
      if (buyOrRent === BuyOrRent.Buy) {
        const filtedData = realpricesChartData.filter((item) => item.buy_price && item.buy_price > 0);

        return scaleLinear({
          domain: extent([
            ...(extent(filtedData, (d) => getYPriceDomainPrices(d.buy_price, d.buy_prices)) as number[]),
            ...(extent(filtedData, (d) => getYPriceDomainMinPrices(d.buy_price, d.buy_prices)) as number[]),
            ...(extent(filtedData, (d) => getBuyPrice(d)) as number[]),
          ]) as number[],

          range: [lineChartHeight - paddingVertical - paddingVertical, paddingVertical + paddingVertical],
        });
      }

      const filtedData = realpricesChartData.filter((item) => item.jeonsae_price && item.jeonsae_price > 0);

      return scaleLinear({
        domain: extent([
          ...(extent(filtedData, (d) => getYPriceDomainPrices(d.jeonsae_price, d.jeonsae_prices)) as number[]),
          ...(extent(filtedData, (d) => getYPriceDomainMinPrices(d.jeonsae_price, d.jeonsae_prices)) as number[]),
          ...(extent(filtedData, (d) => getJeonsaePrice(d)) as number[]),
        ]) as number[],

        range: [lineChartHeight - paddingVertical - paddingVertical, paddingVertical + paddingVertical],
      });
    }, [buyOrRent, realpricesChartData]);

    const tickValues = useMemo(() => {
      if (!realpricesChartData || realpricesChartData?.length === 0) return;

      const round = (value: number) => Math.round(value / 10000) * 10000;

      if (buyOrRent === BuyOrRent.Buy) {
        const filtedData = realpricesChartData.filter((item) => item.buy_price && item.buy_price > 0);

        const lowerUpperBound = extent([
          ...(extent(filtedData, (d) => getYPriceDomainPrices(d.buy_price, d.buy_prices)) as number[]),
          ...(extent(filtedData, (d) => getYPriceDomainMinPrices(d.buy_price, d.buy_prices)) as number[]),
          ...(extent(filtedData, (d) => getBuyPrice(d)) as number[]),
        ]) as number[];

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
      }

      const filtedData = realpricesChartData.filter((item) => item.jeonsae_price && item.jeonsae_price > 0);

      const lowerUpperBound = extent([
        ...(extent(filtedData, (d) => getYPriceDomainPrices(d.jeonsae_price, d.jeonsae_prices)) as number[]),
        ...(extent(filtedData, (d) => getYPriceDomainMinPrices(d.jeonsae_price, d.jeonsae_prices)) as number[]),
        ...(extent(filtedData, (d) => getJeonsaePrice(d)) as number[]),
      ]) as number[];

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
    }, [buyOrRent, realpricesChartData]);

    const yScaleCount = useMemo(
      () =>
        scaleLinear({
          domain: [
            0,
            Math.max(
              ...realpricesChartData.map((item) => item.buy_count ?? 0),
              ...realpricesChartData.map((item) => item.jeonsae_count ?? 0),
            ),
          ],
          range: [barChartHeight - paddingVertical, paddingVertical],
        }),
      [realpricesChartData],
    );

    const bisectDate = bisector<DataProps, Date>((d) => new Date(d.date)).left;

    const handleTooltip = useCallback(
      (e: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        e.stopPropagation();
        const { x } = localPoint(e) || { x: 0 };

        const x0 = xScale.invert(x);
        const index = bisectDate(realpricesChartData, x0, 1);

        const d0 = realpricesChartData[index - 1];
        const d1 = realpricesChartData[index];

        let d = d0;

        if (d1 && getDate(d1)) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
        }

        if (d) {
          if (isTouchDevice()) {
            const yValue = buyOrRent === BuyOrRent.Buy ? getBuyPrice(d) : getJeonsaePrice(d);
            showTooltip({
              tooltipData: d as DataProps,
              tooltipLeft: xScale(getDate(d)) + 2,
              tooltipTop: yScalePrice(yValue || 0),
            });
          }

          const firstIndex =
            buyOrRent === BuyOrRent.Buy
              ? realpricesChartData.findIndex((item) => item.buy_price && item.buy_price > 0)
              : realpricesChartData.findIndex((item) => item.jeonsae_price && item.jeonsae_price > 0);
          const lastIndex =
            buyOrRent === BuyOrRent.Buy
              ? realpricesChartData.length -
                [...realpricesChartData].reverse().findIndex((item) => item.buy_price && item.buy_price > 0) -
                1
              : realpricesChartData.length -
                [...realpricesChartData].reverse().findIndex((item) => item.jeonsae_price && item.jeonsae_price > 0) -
                1;
          if (x < xScale(getDate(realpricesChartData[firstIndex]))) {
            const tooltipTopValue =
              buyOrRent === BuyOrRent.Buy
                ? getBuyPrice(realpricesChartData[firstIndex])
                : getJeonsaePrice(realpricesChartData[firstIndex]);
            showTooltip({
              tooltipData: realpricesChartData[firstIndex] as DataProps,
              tooltipLeft: xScale(getDate(realpricesChartData[firstIndex])) + 2,
              tooltipTop: yScalePrice(tooltipTopValue || 0),
            });
            return;
          }
          if (x > xScale(getDate(realpricesChartData[lastIndex]))) {
            const tooltipTopValue =
              buyOrRent === BuyOrRent.Buy
                ? getBuyPrice(realpricesChartData[lastIndex])
                : getJeonsaePrice(realpricesChartData[lastIndex]);
            showTooltip({
              tooltipData: realpricesChartData[lastIndex] as DataProps,
              tooltipLeft: xScale(getDate(realpricesChartData[lastIndex])) + 2,
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
            const yValue = buyOrRent === BuyOrRent.Buy ? getBuyPrice(d) : getJeonsaePrice(d);
            showTooltip({
              tooltipData: d as DataProps,
              tooltipLeft: xScale(getDate(d)) + 2,
              tooltipTop: yScalePrice(yValue || 0),
            });
          }
        }
      },

      [xScale, bisectDate, realpricesChartData, buyOrRent, showTooltip, yScalePrice],
    );

    const renderNodata = useMemo(() => {
      if (!realpricesChartData) return false;

      if (buyOrRent === BuyOrRent.Buy && realpricesChartData.filter((item) => item.buy_count).length === 0) {
        return true;
      }
      if (buyOrRent !== BuyOrRent.Buy && realpricesChartData.filter((item) => item.jeonsae_count).length === 0) {
        return true;
      }

      return false;
    }, [realpricesChartData, buyOrRent]);

    useEffect(() => {
      hideTooltip();
    }, [buyOrRent, selectedYear, selectedIndex, hideTooltip, checked]);

    useEffect(() => {
      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches[0]) {
          lastTouchRef.current = e.touches[0];
        }
      };

      document.addEventListener('touchstart', handleTouchStart);

      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
      };
    }, []);

    const decideMt = () => {
      if (buyOrRent === BuyOrRent.Buy && tooltipData?.buy_price && tooltipData?.buy_price > 0) {
        return 10;
      }

      if (buyOrRent !== BuyOrRent.Buy && tooltipData?.jeonsae_price && tooltipData?.jeonsae_price > 0) {
        return 10;
      }

      return 0;
    };

    return (
      <div tw="relative" css={[decideMt() > 0 ? tw`mt-[4rem]` : tw`mt-3`]}>
        {tickValues && (
          <DanjiLineChart
            width={width}
            yAxisWidth={yAxisWidth}
            lineChartHeight={lineChartHeight}
            data={realpricesChartData}
            buyOrRent={buyOrRent}
            xScale={xScale}
            tickValues={tickValues}
            yScalePrice={yScalePrice}
            renderNodata={renderNodata}
            tooltipLeft={tooltipLeft}
            tooltipData={tooltipData}
            tooltipTop={tooltipTop}
            handleTooltip={handleTooltip}
          />
        )}
        <DanjiBarChart
          width={width}
          yAxisWidth={yAxisWidth}
          barChartHeight={barChartHeight}
          data={realpricesChartData}
          buyOrRent={buyOrRent}
          xScale={xScale}
          yScaleCount={yScaleCount}
          renderNodata={renderNodata}
          tooltipLeft={tooltipLeft}
          tooltipData={tooltipData}
          handleTooltip={handleTooltip}
        />
        <DanjiChartAxisBottomWithLine
          width={width}
          yAxisWidth={yAxisWidth}
          paddingLeft={paddingLeft}
          xScale={xScale}
          selectedYear={selectedYear}
          xAxis={xAxis}
        />
        <DanjiChartTooltip
          left={tooltipLeft}
          data={tooltipData}
          buy={buyOrRent === BuyOrRent.Buy}
          jeonsae={buyOrRent !== BuyOrRent.Buy}
        />
      </div>
    );
  },
);
