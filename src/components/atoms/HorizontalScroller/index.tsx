import { HTMLProps, useRef } from 'react';
import { styled } from 'twin.macro';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  overflow-y: visible;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function HorizontalScroller({ children, ...props }: Omit<HTMLProps<HTMLDivElement>, 'as' | 'theme'>) {
  const constraintsRef = useRef<HTMLDivElement | null>(null);

  return (
    <Container ref={constraintsRef} {...props}>
      <motion.div tw="flex overflow-y-visible" drag="x" dragConstraints={constraintsRef}>
        {children}
      </motion.div>
    </Container>
  );
}
