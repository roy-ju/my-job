export default function convertNumberToPriceInput(value?: number) {
  if (value) {
    return `${value / 10000}`;
  }

  return '';
}
