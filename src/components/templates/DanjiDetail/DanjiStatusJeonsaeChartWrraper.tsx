import React, { useMemo } from 'react';
import { extent } from 'd3-array';
import { AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { scaleLinear, scaleTime } from '@visx/scale';
import { Circle, LinePath } from '@visx/shape';
import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';
import { customAlphabet } from 'nanoid';
import { DanjiChartAxisBottom } from './DanjiChartAxisBottom';

const lineChartHeight = 131;
const yAxisWidth = 42;
const paddingRight = 16;
const paddingLeft = 11;
const paddingVertical = 9;

type ChartData = {
  sigungu_jeonsae_rate?: number | null;
  sido_jeonsae_rate?: number | null;
  danji_jeonsae_rate?: number | null;
  date: Date;
  isManipulate?: boolean;
}[];

function getDate(d: ChartData[0]) {
  return new Date(d.date).valueOf();
}

function getSigunguJeonsaeRate(d: ChartData[0]) {
  return d.sigungu_jeonsae_rate;
}

function getSidoJeonsaeRate(d: ChartData[0]) {
  return d.sido_jeonsae_rate;
}
function getDanjiJeonsaeRate(d: ChartData[0]) {
  return d.danji_jeonsae_rate;
}

const DanjiStatusJeonsaeChartWrraper = React.memo(
  ({
    width = 0,
    xAxis,
    danjiChartData,
    sigunguChartData,
    sidoChartData,
    selectedYear,
  }: {
    width?: number;
    xAxis: MonthStartDate[];
    danjiChartData: ChartData;
    sigunguChartData: ChartData;
    sidoChartData: ChartData;
    selectedYear: number;
  }) => {
    const nanoid = customAlphabet('1234567890abcdef', 10);

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

    const yScaleJensaerate = useMemo(() => {
      const filtedSigunguData = sigunguChartData.filter(
        (item) => item.sigungu_jeonsae_rate && item.sigungu_jeonsae_rate > 0,
      );
      const filtedSidoData = sidoChartData.filter((item) => item.sido_jeonsae_rate && item.sido_jeonsae_rate > 0);
      const filtedDanjiData = danjiChartData.filter((item) => item.danji_jeonsae_rate && item.danji_jeonsae_rate > 0);

      return scaleLinear({
        domain: extent([
          ...(extent(filtedSigunguData, (d) => getSigunguJeonsaeRate(d)) as number[]),
          ...(extent(filtedSidoData, (d) => getSidoJeonsaeRate(d)) as number[]),
          ...(extent(filtedDanjiData, (d) => getDanjiJeonsaeRate(d)) as number[]),
        ]) as number[],
        range: [lineChartHeight - paddingVertical, paddingVertical],
      });
    }, [danjiChartData, sidoChartData, sigunguChartData]);

    const danjiCircles = useMemo(() => {
      if (!danjiChartData) return null;

      return danjiChartData
        .filter((v) => v.isManipulate !== true)
        .map((d) => {
          const cx = xScale(getDate(d));
          const cy = yScaleJensaerate(getDanjiJeonsaeRate(d) as number);
          return (
            <Circle
              key={`danji-jeonsae-circle-${nanoid()}`}
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
    }, [danjiChartData, nanoid, xScale, yScaleJensaerate]);

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
              scale={yScaleJensaerate}
              numTicks={4}
              stroke="#E1E1E1"
              strokeOpacity="0.5"
            />

            <AxisLeft
              left={yAxisWidth}
              scale={yScaleJensaerate}
              tickLength={8}
              tickStroke="transparent"
              strokeWidth={0}
              numTicks={4}
              tickFormat={(v) => `${`${v.toString()}%`}`}
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
              data={sigunguChartData.filter((d) => d.sigungu_jeonsae_rate && d.sigungu_jeonsae_rate > 0)}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScaleJensaerate(getSigunguJeonsaeRate(d) as number)}
            />

            <LinePath
              stroke="#FFB798"
              strokeDasharray={4}
              strokeWidth={2}
              data={sidoChartData.filter((d) => d.sido_jeonsae_rate && d.sido_jeonsae_rate > 0)}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScaleJensaerate(getSidoJeonsaeRate(d) as number)}
            />

            <LinePath
              stroke="#FF542D"
              strokeWidth={2}
              data={danjiChartData.filter((d) => d.danji_jeonsae_rate && d.danji_jeonsae_rate > 0)}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScaleJensaerate(getDanjiJeonsaeRate(d) as number)}
            />

            {danjiCircles}
          </svg>

          <div style={{ position: 'absolute', bottom: -20 }}>
            <DanjiChartAxisBottom
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

export default DanjiStatusJeonsaeChartWrraper;
