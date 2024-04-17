import { ReactNode } from 'react';

import { createPortal } from 'react-dom';

import tw from 'twin.macro';

import { motion } from 'framer-motion';

const animations = {
  none: {},
  scale: {
    scale: [0, 1],
    opacity: [0, 1],
  },
};
export interface FullScreenPresenterProps {
  isAnimate?: boolean;
  position?: 'center' | 'top-left';
  dropShadow?: boolean;
  animationType?: 'none' | 'scale';
  children?: ReactNode;
}

export default function FullScreenPresenter({
  isAnimate = true,
  animationType = 'scale',
  position = 'center',
  dropShadow = true,
  children,
}: FullScreenPresenterProps) {
  const container = typeof window !== 'undefined' && document.getElementById('rootOverlay');

  return container && children
    ? createPortal(
        <div
          css={[
            tw`fixed top-0 left-0 flex flex-col w-full h-full z-[1000] pointer-events-auto`,
            position === 'center' && tw`items-center justify-center`,
            dropShadow && tw`bg-[rgba(0,0,0,0.5)]`,
          ]}
        >
          <motion.div tw="w-full h-full" animate={isAnimate && animations[animationType]}>
            {children}
          </motion.div>
        </div>,
        container,
      )
    : null;
}
