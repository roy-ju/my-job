import { ReactHTML } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import tw, { styled } from 'twin.macro';

type AnimationComponentProps<T extends keyof ReactHTML> = HTMLMotionProps<T> & {};

const FabButton = styled(motion.button)<AnimationComponentProps<'button'>>`
  ${tw`bg-nego-800 ml-auto [box-shadow: 0px 0px 16px 0px #0000001F] hover:bg-nego-600 focus:bg-nego-900 active:bg-nego-1000 transition-none [border-radius: 100px] text-white whitespace-nowrap flex items-center gap-1`}
`;

export default FabButton;

/* ${({ type }) =>
    type === 'extended'
      ? tw`flex items-center gap-1 [border-radius: 100px] px-4 h-12 transition-all`
      : tw`w-12 h-12 [border-radius: 100px] px-0 transition-all`} */
