import tw, { styled } from 'twin.macro';

import { Information } from '@/components/molecules';

import ExclamationMark from '@/assets/icons/exclamation_mark.svg';

const Container = styled.div`
  ${tw`flex-1 min-h-0 mt-7`}
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
          <Information.Title>알림이 없습니다.</Information.Title>
        </Column>
      </Information>
    </Container>
  );
}
