export default function combineStrings(val?: string, val2?: string) {
  if (val && val2 && val === val2) {
    return `${val}`;
  }

  if (val && val2) {
    return `${val},${val2}`;
  }

  if (val) {
    return `${val}`;
  }

  if (val2) {
    return `${val2}`;
  }
  return '';
}
