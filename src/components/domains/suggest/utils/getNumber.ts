import isNaN from 'lodash/isNaN';

export default function getNumber(value: any) {
  if (!value) return 0;

  if (isNaN(value)) return 0;

  return Number(value);
}
