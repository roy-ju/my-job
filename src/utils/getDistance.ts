export default function getDistance(val: number | undefined) {
  if (val) {
    const result = val * 1000;

    return result > 1000
      ? `${val.toFixed(1)[2] === '0' ? val.toFixed(0) : val.toFixed(1)}km`
      : `${(val * 1000).toFixed(0)}m`;
  }

  return '-';
}
