import { Panel } from '@/components/atoms';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  width?: string;
  animationDuration?: number;
  children?: ReactNode;
  onAnimationComplete?: () => void;
};

export default function AnimatedPanel({
  width = '375px',
  animationDuration = 0.5,
  onAnimationComplete,
  children,
}: Props) {
  return (
    <motion.div
      onAnimationComplete={onAnimationComplete}
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
      }}
    >
      <Panel width={width}>{children}</Panel>
    </motion.div>
  );
}
