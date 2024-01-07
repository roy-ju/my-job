import { ReactHTML } from 'react';

import { styled } from 'twin.macro';

import { HTMLMotionProps, LazyMotion, domAnimation, m } from 'framer-motion';

type AnimationComponentProps<T extends keyof ReactHTML> = HTMLMotionProps<T> & {};

const MotionSpan = styled(m.span)<AnimationComponentProps<'span'>>``;

const MotionLi = styled(m.li)<AnimationComponentProps<'li'>>``;

const MotionP = styled(m.p)<AnimationComponentProps<'p'>>``;

export const AnimationSpan = ({
  initial = { opacity: 0, y: -5 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}: AnimationComponentProps<'span'>) => (
  <LazyMotion features={domAnimation}>
    <MotionSpan initial={initial} animate={animate} transition={transition} {...props} />
  </LazyMotion>
);

export const AnimationLi = ({
  initial = { opacity: 0, y: -5 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}: AnimationComponentProps<'li'>) => (
  <LazyMotion features={domAnimation}>
    <MotionLi initial={initial} animate={animate} transition={transition} {...props} />
  </LazyMotion>
);

export const AnimationP = ({
  initial = { opacity: 0, y: -5 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.3 },
  ...props
}: AnimationComponentProps<'p'>) => (
  <LazyMotion features={domAnimation}>
    <MotionP initial={initial} animate={animate} transition={transition} {...props} />
  </LazyMotion>
);
