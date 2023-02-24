export function formatNumberInKorean(
  number: number,
  formatFn?: (num: number) => string,
) {
  const inputNumber = number < 0 ? 0 : number;
  const unitWords = ['', '만', '억', '조', '경'];
  const splitUnit = 10000;
  const splitCount = unitWords.length;
  const resultArray = [];
  let resultString = '';

  if (inputNumber === 0) {
    return `${inputNumber.toString()}`;
  }

  for (let i = 0; i < splitCount; i += 1) {
    let unitResult = (inputNumber % splitUnit ** (i + 1)) / splitUnit ** i;
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (let i = 0; i < resultArray.length; i += 1) {
    if (resultArray[i]) {
      const num = formatFn ? formatFn(resultArray[i]) : resultArray[i];
      resultString = `${num + unitWords[i]} ${resultString}`;
    }
  }

  return `${resultString.substring(0, resultString.length - 1)}`;
}
