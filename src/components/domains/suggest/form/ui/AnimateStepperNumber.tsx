import { ReactNode, memo } from 'react';

import { motion } from 'framer-motion';

const animate = {
  y: [0, -5, 0],
  opacity: [0, 1],
};

const transition = {
  y: {
    repeat: Infinity,
    duration: 2,
    ease: 'easeInOut',
  },
  opacity: {
    duration: 1,
    ease: 'easeInOut',
    repeatDelay: 0.4,
    repeat: 0,
  },
};

type AnimateStepperNumberProps = {
  children: ReactNode;
  active?: boolean;
};

function AnimateStepperNumber({ children, active }: AnimateStepperNumberProps) {
  return (
    <motion.div animate={active ? animate : { opacity: 1 }} transition={active ? transition : { opacity: 1 }}>
      {children}
    </motion.div>
  );
}

export default memo(AnimateStepperNumber);
