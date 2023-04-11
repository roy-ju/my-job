export default function convertToISOString(value: string) {
  const date = new Date(value);
  return date.toISOString();
}
