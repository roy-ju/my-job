import { BuyOrRent } from '@/constants/enums';

export function convertSignupPass(v?: string) {
  if (!v) return '';

  if (v === 'internet') return '인터넷 검색';
  if (v === 'sns') return 'SNS 및 블로그';
  if (v === 'appstore') return '앱스토어';
  if (v === 'friends') return '지인 소개';
  if (v === 'ad') return '광고';
  if (v === 'news') return '뉴스 기사';

  return '기타';
}

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

export function makeAddressDetail({ danjiName, dong, ho }: { danjiName: string; dong: string; ho: string }) {
  if (danjiName && dong && ho) {
    return `${danjiName} ${dong.replaceAll('동', '')}동 ${ho.replaceAll('호', '')}호`;
  }

  if (danjiName && dong && !ho) {
    return `${danjiName} ${dong.replaceAll('동', '')}동`;
  }

  if (danjiName && !dong && ho) {
    return `${danjiName} ${ho.replaceAll('호', '')}호`;
  }

  if (danjiName && !dong && !ho) {
    return `${danjiName}`;
  }

  if (!danjiName && dong && ho) {
    return `${dong.replaceAll('동', '')}동 ${ho.replaceAll('호', '')}호`;
  }

  if (!danjiName && dong && !ho) {
    return `${dong.replaceAll('동', '')}동`;
  }

  if (!danjiName && !dong && ho) {
    return `${ho.replaceAll('호', '')}호`;
  }

  return '';
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

export function convertRangeText({
  unit,
  dashStyle,
  bracket,
  v1,
  v2,
}: {
  unit: string;
  dashStyle: string;
  bracket: boolean;
  v1?: string | number;
  v2?: string | number;
}) {
  if (v1 && !v2) {
    return bracket ? `[${v1}]${unit}` : `${v1}${unit}`;
  }

  if (!v1 && v2) {
    return bracket ? `[${v2}]${unit}` : `${v2}${unit}`;
  }

  if (v1 && v2) {
    return v1 === v2
      ? bracket
        ? `[${v1}${unit}]`
        : `${v1}${unit}`
      : bracket
      ? `[${v1}${unit}${dashStyle}${v2}${unit}]`
      : `${v1}${unit}${dashStyle}${v2}${unit}`;
  }

  return '';
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

export function countFormat({ value }: { value: number | undefined | null }) {
  if (typeof value === 'number') {
    return value;
  }
  return 0;
}

export function formatDate({
  format,
  sliceYear,
  year,
  month,
  day,
}: {
  format: string;
  sliceYear: boolean;
  year: string | undefined;
  month: string | undefined;
  day: string | undefined;
}) {
  if (!year || !month || !day) {
    return '';
  }

  const resultYear = sliceYear ? year.slice(2, year.length) : year;
  const resultMonth = Number(month) > 9 ? month : `0${month}`;
  const resultDay = Number(day) > 9 ? day : `0${day}`;

  return `${resultYear}${format}${resultMonth}${format}${resultDay}${format}`;
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

export function ceiling(n: number, pos: number) {
  const digits = 10 ** pos;

  const num = Math.ceil(n * digits) / digits;

  return num.toFixed(pos);
}

export function round(n: number, pos: number) {
  const digits = 10 ** pos;

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

export function convertArea({ type, value }: { type: string; value: string }) {
  if (type === 'meterToPyoung') {
    return value ? (parseFloat(value) / 3.3058).toFixed(0).toString() : '';
  }

  if (type === 'pyoungToMeter') {
    return value ? (parseFloat(value) * 3.3058).toFixed(2).toString() : '';
  }

  return '';
}

export function describeBuyOrRentPriceTitle(v: number) {
  if (v === BuyOrRent.Buy) return '매매가';
  if (v === BuyOrRent.Jeonsae) return '보증금';
  if (v === BuyOrRent.Wolsae) return '월세';
  return '';
}
