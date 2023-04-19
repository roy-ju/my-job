export default function falsy(value: any, proof: string) {
  if (value === null || value === undefined || value === '' || value === 0 || value === false) {
    return proof;
  }
  return value;
}
