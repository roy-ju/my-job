import type { ReactNode } from 'react';

import tw from 'twin.macro';

import { motion } from 'framer-motion';

interface Props {
  width?: string;
  zIndex?: number;
  children?: ReactNode;
}

export default function Panel({ width = '380px', zIndex = 1, children }: Props) {
  return (
    <motion.div
      initial={{ x: '-100px', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      layout
      tw="h-full bg-white shadow"
      style={{ width, zIndex }}
    >
      <div css={[tw`relative w-full h-full overflow-y-auto`, { width }]}>{children}</div>
    </motion.div>
  );
}
