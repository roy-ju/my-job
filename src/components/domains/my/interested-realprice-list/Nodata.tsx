import tw, { styled } from 'twin.macro';

import Information from '@/components/molecules/Information';

import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

const Container = styled.div`
  ${tw`my-24`}
`;

const Column = styled.div`
  ${tw`flex flex-col items-center gap-4 text-center`}
`;

export default function Nodata() {
  return (
    <Container>
      <Information>
        <Column>
          <ExclamationMark />
          <Information.Title>실거래 정보가 없습니다.</Information.Title>
        </Column>
      </Information>
    </Container>
  );
}
