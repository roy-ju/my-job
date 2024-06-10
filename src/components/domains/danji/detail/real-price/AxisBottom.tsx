import { useState, useEffect, memo } from 'react';

import moment from 'moment';

import { Year } from '@/constants/enums';

import { AxisBottom as VisxAxisBottom } from '@visx/axis';

import { AxisBottomProps } from './chartTypes';

function AxisBottom({ width, yAxisWidth, paddingLeft, xScale, selectedYear, xAxis }: AxisBottomProps) {
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
      {typeof yAxisWidth === 'number' && (
        <line x1={yAxisWidth - 1.5} x2={width} y1={0} y2={0} style={{ stroke: '#C2C2C2', strokeWidth: 1.5 }} />
      )}
      <VisxAxisBottom
        scale={xScale}
        numTicks={xAxis.length}
        tickLength={8}
        tickStroke="transparent"
        strokeWidth={0}
        left={paddingLeft}
        tickLabelProps={(_, index) => ({
          fontSize: '11px',
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

export default memo(AxisBottom);
