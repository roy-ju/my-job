export function replaceRegionNames(text: string) {
  const regionMapping: Record<string, string> = {
    서울: '서울시',
    서울특별시: '서울시',
    경기: '경기도',
    경기도: '경기도',
    인천: '인천시',
    인천광역시: '인천시',

    // 부산시: '부산시',
    // 부산광역시: '부산시',
    // 대구광역시: '대구시',
    // 광주광역시: '광주시',
    // 대전광역시: '대전시',
    // 울산광역시: '울산시',
    // 세종특별자치시: '세종시',
    // 강원특별자치도: '강원시',
    // 충청북도: '충북',
    // 충청남도: '충남',
    // 전라북도: '전북',
    // 전라남도: '전남',
    // 경상북도: '경북',
    // 경상남도: '경남',
    // 제주특별자치도: '제주시',
  };

  // 정규식을 사용하여 모든 지역 명칭을 대체
  return text.replace(
    new RegExp(
      Object.keys(regionMapping)
        .map((key) => key.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'))
        .join('|'),
      'g',
    ),
    (match) => regionMapping[match],
  );
}
