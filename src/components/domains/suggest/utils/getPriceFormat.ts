const getPriceFormatFn = (value: number): string =>
  value.toLocaleString('ko-KR', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

export default getPriceFormatFn;
