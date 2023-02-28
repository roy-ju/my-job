import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import tw from 'twin.macro';

type Props = {
  width?: string;
  animationDuration?: number;
  children?: ReactNode;
};

export default function Panel({
  width = '375px',
  animationDuration = 0.3,
  children,
}: Props) {
  return (
    <motion.div
      initial={{ width: '0px' }}
      animate={{ width }}
      exit={{ width: '0px' }}
      transition={{
        type: 'tween',
        duration: animationDuration,
      }}
      tw="h-full overflow-x-hidden bg-white"
    >
      <div
        css={[
          tw`w-full h-full p-2 overflow-x-hidden overflow-y-auto`,
          { width },
        ]}
      >
        {children}
      </div>
    </motion.div>
  );
}
