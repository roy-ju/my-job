import { ReactNode, isValidElement } from 'react';

import tw, { styled } from 'twin.macro';

import { v1 } from 'uuid';

import { motion } from 'framer-motion';

import ImageContainer from './SummaryImageContainer';

import { AnimationP } from './AnimationText';

import useIcons from '../hooks/useIcons';

type SummaryContainerProps = {
  isRender?: boolean;
  title: string;
  children: ReactNode;
  duration?: number;
};

const Container = styled(motion.div)`
  ${tw`flex flex-col gap-1 pb-2 bg-gray-100 px-4 py-3 rounded-lg`}
`;

function SummaryContainer({ isRender = true, title, children, duration = 0.5 }: SummaryContainerProps) {
  const isComponent = isValidElement(children);

  const { iconObj } = useIcons();

  if (!isRender) return null;

  return (
    <Container initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
      <div tw="flex items-center gap-2">
        <ImageContainer key={v1()} transition={{ duration: 0.5 }}>
          {iconObj[title]}
        </ImageContainer>
        <AnimationP
          key={v1()}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          tw="text-gray-1000 text-subhead_03 [width: 84px]"
        >
          {title}
        </AnimationP>
      </div>
      {isComponent ? (
        children
      ) : (
        <AnimationP
          key={v1()}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration }}
          tw="text-body_02 text-gray-800"
        >
          {children}
        </AnimationP>
      )}
    </Container>
  );
}

export default SummaryContainer;
