export function convertSidoName(v: string | undefined | null) {
  if (!v) return '-';

  if (v === '충청남도') return '충남';
  if (v === '충청북도') return '충북';
  if (v === '전라남도') return '전남';
  if (v === '전라북도') return '전북';
  if (v === '경상남도') return '경남';
  if (v === '경상북도') return '경북';

  return v.slice(0, 2);
}
