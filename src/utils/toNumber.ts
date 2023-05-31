export function toNumber(value: any) {
  if (value === undefined || value === null) {
    return 0;
  }
  return Number(value);
}
