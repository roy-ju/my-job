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
      style={{
        height: '100%',
        overflowX: 'hidden',
        background: 'white',
      }}
    >
      <div
        css={[tw`overflow-x-hidden overflow-y-auto w-full h-full`, { width }]}
      >
        {children}
      </div>
    </motion.div>
  );
}
