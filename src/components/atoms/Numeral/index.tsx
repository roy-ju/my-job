import React, { HTMLProps, useCallback } from 'react';
import { formatNumberInKorean } from '@/utils';

/**
 * 숫자를 포맷해서 보여주는 컴포넌트
 */

interface Props extends HTMLProps<HTMLSpanElement> {
  thousandsSeparated?: boolean; // 1000 => 1,000
  koreanNumber?: boolean; // 350000000 => 3억 5000만
  koreanNumberShort?: boolean; // 350000000 => 3.5억
  minimumFractionDigits?: number; // 1.2 => 1.20
  maximumFractionDigits?: number; // 1.234 => 1.23
  falsy?: string; // 0이나 숫자가 아닌값을 표현
  suffix?: string; // 숫자뒤에 붙는 문자 (e.g. 원)
  children?: number | string; // 포맷할 숫자
}

export default React.memo(
  ({
    thousandsSeparated = true,
    koreanNumber = false,
    koreanNumberShort = false,
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
        let formatted = '';
        if (koreanNumber) {
          formatted = formatNumberInKorean(numeral, { formatFn });
        } else if (koreanNumberShort) {
          formatted = formatNumberInKorean(numeral, { formatFn, short: true });
        } else {
          formatted = formatFn(numeral);
        }

        return `${formatted}${suffix}`;
      }
      return numeral;
    };

    return <span {...spanProps}>{renderChildren()}</span>;
  },
);
