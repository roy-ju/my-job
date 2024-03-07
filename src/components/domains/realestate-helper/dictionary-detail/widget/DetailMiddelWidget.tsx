import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

export const MiddleContainer = styled(motion.div)`
  ${tw`p-5 mx-5 bg-gray-100 rounded-2xl`}

  p {
    ${tw`text-gray-700 whitespace-pre-line text-body_03`}
  }
`;

export const Flex = styled.div`
  ${tw`flex flex-row items-center gap-1 mb-2`}

  span {
    ${tw`text-gray-800 text-subhead_03`}
  }
`;
