import React, { useCallback } from 'react';
import { formatNumberInKorean } from '@/utils/strings';

type Props = {
  thousandsSeparated?: boolean;
  koreanNumber?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  falsy?: string;
  suffix?: string;
  children?: number | string;
} & React.HTMLAttributes<HTMLSpanElement>;

export default React.memo(
  ({
    thousandsSeparated = true,
    koreanNumber = false,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    falsy,
    suffix = '',
    children,
    ...spanProps
  }: Props) => {
    const formatFn = useCallback(
      (value: number): string =>
        value.toLocaleString('ko-KR', {
          useGrouping: thousandsSeparated,
          minimumFractionDigits,
          maximumFractionDigits,
        }),
      [thousandsSeparated, minimumFractionDigits, maximumFractionDigits],
    );

    const renderChildren = () => {
      const numeral = Number(children);
      if (falsy !== undefined && !numeral) {
        return falsy;
      }
      if (!Number.isNaN(numeral)) {
        const formatted = koreanNumber
          ? formatNumberInKorean(numeral, formatFn)
          : formatFn(numeral);
        return `${formatted}${suffix}`;
      }
      return numeral;
    };

    return <span {...spanProps}>{renderChildren()}</span>;
  },
);
