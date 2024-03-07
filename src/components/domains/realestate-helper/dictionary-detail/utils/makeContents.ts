export default function makeContents(v1?: string, v2?: string) {
  if (v1 && v2) return `${v1}\n\n${v2}`;

  if (v1 && !v2) return v1;

  return '';
}
