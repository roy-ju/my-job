import { ReactHTML } from 'react';

import { HTMLMotionProps, motion } from 'framer-motion';

import tw, { styled } from 'twin.macro';

type AnimationComponentProps<T extends keyof ReactHTML> = HTMLMotionProps<T> & {};

const FabButton = styled(motion.button)<AnimationComponentProps<'button'>>`
  ${tw`bg-nego-800 ml-auto [box-shadow: 0px 0px 16px 0px #0000001F] hover:bg-nego-600 focus:bg-nego-900 active:bg-nego-1000 transition-none [border-radius: 100px] text-body_02 text-white whitespace-nowrap flex items-center justify-center gap-1`}
`;

export default FabButton;
