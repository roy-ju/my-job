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


export function convertSigunguName(v: string | undefined | null) {
  if (!v) return '-';

  if (v === '서울특별시 광진구') return '광진구';
  if (v === '서울특별시 강북구') return '강북구';
  if (v === '서울특별시 금천구') return '금천구';

  if (v === '인천광역시 미추홀구') return '미추홀구';
  if (v === '인천광역시 부평구') return '부평구';
  if (v === '인천광역시 계양구') return '계양구';
  if (v === '인천광역시 연수구') return '연수구';

  if (v === '광주광역시 남구') return '남구';

  return v;
}