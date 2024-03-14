import tw, { styled } from 'twin.macro';

import ExclamationMark from '@/assets/icons/exclamation_mark_48.svg';

import { MarginTopTwenty, NodataParagraph } from './widget/RealestateDocumentListWidget';

const Container = styled.div`
  ${tw`mx-auto w-fit [margin-top: 200px]`}
`;

export default function Nodata() {
  return (
    <Container>
      <ExclamationMark tw="mx-auto" />
      <MarginTopTwenty />
      <NodataParagraph>조회한 등기부가 없습니다.</NodataParagraph>
    </Container>
  );
}
