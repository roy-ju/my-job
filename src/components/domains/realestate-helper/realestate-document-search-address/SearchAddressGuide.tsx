import { MarginTopTwentyFour, MarginTopSixteen } from '@/components/atoms/Margin';

import { GuideTitle, GuideParagraph } from './widget/RealestateDocumentSearchAddressWidget';

export default function SearchAddressGuide() {
  return (
    <div tw="p-5">
      <GuideTitle>이렇게 검색해보세요.</GuideTitle>
      <MarginTopTwentyFour />
      <GuideParagraph>
        <p>도로명 + 건물번호</p>
        <p>예) 판교역로 235, 제주 첨단로 242</p>
      </GuideParagraph>
      <MarginTopSixteen />
      <GuideParagraph>
        <p>지역명(동/리) + 번지</p>
        <p>예) 삼평동 681, 제주 영평동 2181</p>
      </GuideParagraph>
      <MarginTopSixteen />
      <GuideParagraph>
        <p>아파트 단지명</p>
        <p>예) 광교중흥S클래스, 한화꿈에그린프레스티지</p>
      </GuideParagraph>
    </div>
  );
}
