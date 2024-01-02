/* eslint-disable consistent-return */
import round from 'lodash/round';
import formatNumberInKorean from './formatNumberInKorean';
import { toNumber } from './toNumber';

export function formatTickLabel(value: any, tickVal: any[]) {
  const num = Math.round(toNumber(value) / 10000) * 10000;

  if (tickVal.filter((val) => val >= 100000000).length > 0) {
    if (num < 100000000) {
      return round(num / 100000000, 1)
        .toString()
        .includes('.')
        ? `${round(num / 100000000, 1)}억`
        : `${round(num / 100000000, 1)}.0억`;
    }
    if (num >= 100000000) {
      return round(num / 100000000, 1)
        .toString()
        .includes('.')
        ? `${round(num / 100000000, 1)}억`
        : `${round(num / 100000000, 1)}.0억`;
    }
  } else {
    return formatNumberInKorean(num);
  }
}

export function priceLabel(value: any) {
  const num = Math.round(toNumber(value) / 10000) * 10000;

  if (num < 100000000) {
    return formatNumberInKorean(num);
  }

  if (num >= 100000000) {
    return round(num / 100000000, 1)
      .toString()
      .includes('.')
      ? `${round(num / 100000000, 1)}억`
      : `${round(num / 100000000, 1)}.0억`;
  }
}
