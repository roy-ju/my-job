export default function createClassName(
  componentName: string,
  ...classNames: string[]
) {
  return `${componentName} ${classNames
    .filter((item) => item !== '')
    .map((item) => `${componentName}-${item}`)
    .join(' ')}`;
}
