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

export function cuttingDot(target: number | undefined) {
  if (!target) return '-';

  const convertedNum = target.toString();
  const dotIndex = convertedNum.indexOf('.');

  if (dotIndex === -1) {
    return convertedNum;
  }

  return convertedNum.slice(0, dotIndex);
}

export function minDigits(num: number, digits: number) {
  return num.toLocaleString('en-US', {
    useGrouping: false,
    minimumIntegerDigits: digits,
  });
}

export function formatUseAcceptedYear(value: string) {
  if (value.length === 4) {
    return `${value}년`;
  }

  if (value.length === 6) {
    return `${value.substring(0, 4)}년 ${value.substring(4, 6)}월`;
  }

  if (value.length === 8) {
    return `${value.substring(0, 4)}년 ${value.substring(4, 6)}월 ${value.substring(6, 8)}일`;
  }

  return value;
}

export function ceiling(n:number, pos:number) {
	const digits = 10**pos;

	const num = Math.ceil(n * digits) / digits;

	return num.toFixed(pos);
}


export function round(n:number, pos:number) {
	const digits = 10**pos;

	let sign = 1;
	if (n < 0) {
		sign = -1;
	}

	// 음수이면 양수처리후 반올림 한 후 다시 음수처리
	n *= sign;
	let num = Math.round(n * digits) / digits;
	num *= sign;

	return num.toFixed(pos);
}