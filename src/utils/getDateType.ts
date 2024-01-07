export default function getDateType(value?: string) {
  if (value === '이전') return 1;

  if (value === '이후') return 2;

  if (value === '당일') return 3;

  return 0;
}
