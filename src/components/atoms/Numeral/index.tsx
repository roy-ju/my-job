import React, { useCallback } from 'react';
import { formatNumberInKorean } from '@/utils/strings';

type Props = {
  thousandsSeparated?: boolean;
  koreanNumber?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  children?: number | string;
} & React.HTMLAttributes<HTMLSpanElement>;

export default React.memo(
  ({
    thousandsSeparated = true,
    koreanNumber = false,
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
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
      const childrenType = typeof children;
      if (childrenType === 'string' || childrenType === 'number') {
        if (koreanNumber) {
          return formatNumberInKorean(Number(children), formatFn);
        }
        return formatFn(Number(children));
      }
      return '';
    };

    return <span {...spanProps}>{renderChildren()}</span>;
  },
);
