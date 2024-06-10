import tw, { styled } from 'twin.macro';

import ExclamationMark from '@/assets/icons/exclamation_mark_outlined.svg';

const Container = styled.div`
  ${tw`flex flex-row items-center justify-center gap-1 bg-gray-200 py-6 [border-radius: 8px]`}
`;

const Message = styled.span`
  ${tw`text-gray-600`}
`;

export default function RealPriceChartNodata() {
  return (
    <Container>
      <ExclamationMark />
      <Message>실거래 기록이 없습니다.</Message>
    </Container>
  );
}
