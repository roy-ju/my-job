export function getTranslateX(transformStr: string) {
  const regex = /translateX\((-?\d+(?:\.\d+)?)px\)/;
  const match = transformStr.match(regex);
  if (match && match[1]) {
    return parseFloat(match[1]);
  }
  return 0;
}
