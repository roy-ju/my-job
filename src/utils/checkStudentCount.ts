export default function checkStudentCount(value: number | null | undefined) {
  if (typeof value !== 'number') {
    return '-명';
  }

  const stringValue = value.toFixed(1).toString();
  if (stringValue[stringValue.length - 1] === '0') {
    return `${stringValue.slice(0, stringValue.length - 2)}명`;
  }

  return `${stringValue}명`;
}
