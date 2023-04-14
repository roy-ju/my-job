import { ScaleTime } from 'd3';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Year } from '@/constants/enums';
import { AxisBottom } from '@visx/axis';
import { MonthStartDate } from '@/components/pages/pc/DanjiDetail/useXAxisDate';

export function DanjiChartAxisBottom({
  width,
  paddingLeft,
  xScale,
  selectedYear,
  xAxis,
}: {
  width: number;
  paddingLeft: number;
  xScale: ScaleTime<number, number, never>;
  selectedYear: number;
  xAxis: MonthStartDate[];
}) {
  const [labelIndexes, setLabelIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (selectedYear === Year.One) {
      setLabelIndexes([1, 3, 5, 7, 9, 11]);
    } else if (selectedYear === Year.Three) {
      setLabelIndexes([5, 11, 17, 23, 29, 35]);
    } else if (selectedYear === Year.Five) {
      setLabelIndexes([9, 19, 29, 39, 49, 59]);
    }
  }, [selectedYear]);

  return (
    <svg width={width} height={20}>
      <AxisBottom
        scale={xScale}
        numTicks={xAxis.length}
        tickLength={8}
        tickStroke="transparent"
        strokeWidth={0}
        left={paddingLeft}
        tickLabelProps={(_, index) => ({
          fontSize: '11px',
          fontFamily: 'pretend',
          fontWeight: 400,
          fill: '#868E96',
          textAnchor: 'end',
          opacity: labelIndexes.includes(index) ? 1 : 0,
        })}
        tickFormat={(date) => moment(date as Date).format('YY.MM')}
      />
    </svg>
  );
}
