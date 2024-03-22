import tw, { styled } from 'twin.macro';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import ExclamationMark from '@/assets/icons/exclamation_mark_48.svg';

import { NodataParagraph } from './widget/RealestateDocumentListWidget';

const Container = styled.div`
  ${tw`mx-auto w-fit [margin-top: 200px]`}
`;

export default function Nodata() {
  return (
    <Container>
      <ExclamationMark tw="mx-auto" />
      <MarginTopTwenty />
      <NodataParagraph tw="text-center">조회한 등기부가 없습니다.</NodataParagraph>
      <MarginTopTwenty />
      <NodataParagraph tw="[width: 295px] rounded-2xl text-body_02 bg-gray-100 text-center [padding-inline: 30px] [padding-block: 16px]">
        주 3회 등기부 조회가 무료입니다.
        <br />
        신규 조회를 눌러서
        <br />
        원하는 건물의 등기부를 확인해보세요!
      </NodataParagraph>
    </Container>
  );
}
