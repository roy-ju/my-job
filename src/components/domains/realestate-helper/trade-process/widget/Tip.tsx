import tw, { styled } from 'twin.macro';

import BulbIcon from '@/assets/icons/bulb_20.svg';

const TipTitle = styled.span`
  ${tw`text-gray-800 text-subhead_02`}
`;

const TipText = styled.p`
  ${tw`text-gray-700 whitespace-pre-line text-body_02`}
`;

const Column = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const Flex = styled.div`
  ${tw`flex items-center gap-1`}
`;

export default function Tip({ text = '' }: { text?: string }) {
  if (!text) return null;

  return (
    <Column>
      <Flex>
        <BulbIcon />
        <TipTitle>부동산 거래 팁</TipTitle>
      </Flex>
      <TipText>{text}</TipText>
    </Column>
  );
}
