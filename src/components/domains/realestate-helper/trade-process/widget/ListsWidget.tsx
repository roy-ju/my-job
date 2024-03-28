import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

export const Ul = styled(motion.ul)`
  ${tw`relative flex flex-col`}
`;

export const Li = styled.li<{ hiddenVerticalLine: boolean; isLast: boolean }>`
  ${tw`relative`}

  ::after {
    content: '';
    position: absolute;
    left: 11.5px;
    top: 37px;
    bottom: 0;
    width: 2px;
    background-color: ${tw`bg-gray-200`};
    height: calc(100% - 48px);
  }

  &:last-child::after {
    ${({ hiddenVerticalLine }) => hiddenVerticalLine && tw`[display: none] [height: calc(100% - 47px - 44px)]`}
    ${({ isLast }) => isLast && tw`[height: calc(100% - 37px - 40px - 30px)]`}
  }
`;
