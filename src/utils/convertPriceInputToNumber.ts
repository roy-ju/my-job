export default function convertPriceInputToNumber(value?: string) {
  if (value) {
    return Number(value) * 10000;
  }

  return 0;
}
