import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

import CautionIcon from '@/assets/icons/caution_20.svg';

import { contentVariants } from '../constants/animations';

const CautionTitle = styled.span`
  ${tw`text-gray-800 text-subhead_02`}
`;

const CautionText = styled.p`
  ${tw`text-gray-700 whitespace-pre-line text-body_02`}
`;

const Column = styled(motion.div)`
  ${tw`flex flex-col gap-2`}
`;

const Flex = styled.div`
  ${tw`flex items-center gap-1`}
`;

export default function Caution({ text = '' }: { text?: string }) {
  if (!text) return null;

  return (
    <Column variants={contentVariants}>
      <Flex tw="flex items-center gap-1">
        <CautionIcon />
        <CautionTitle>주의사항</CautionTitle>
      </Flex>
      <CautionText>{text}</CautionText>
    </Column>
  );
}
