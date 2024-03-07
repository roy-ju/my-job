import tw, { styled } from 'twin.macro';

import { motion } from 'framer-motion';

export const Column = styled(motion.div)`
  ${tw`flex flex-col`}
`;

export const CategoryName = styled.p`
  ${tw`text-gray-700 text-body_02`}
`;
