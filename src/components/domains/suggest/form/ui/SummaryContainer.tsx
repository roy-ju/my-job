import { ReactNode, isValidElement } from 'react';

import tw, { styled } from 'twin.macro';

import { v1 } from 'uuid';
import { AnimationP } from './AnimationText';

type SummaryContainerProps = {
  isRender?: boolean;
  title: string;
  children: ReactNode;
  duration?: number;
};

const Container = styled.div`
  ${tw`flex flex-col [gap: 5px] border-b border-b-gray-300 pb-2`}

  :last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  p {
    ${tw`text-body_02`}
  }
`;

function SummaryContainer({ isRender = true, title, children, duration = 0.5 }: SummaryContainerProps) {
  const isComponent = isValidElement(children);

  if (!isRender) return null;

  return (
    <Container>
      <AnimationP
        key={v1()}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration }}
        tw="text-gray-700 [width: 84px]"
      >
        {title}
      </AnimationP>
      {isComponent ? (
        children
      ) : (
        <AnimationP
          key={v1()}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration }}
        >
          {children}
        </AnimationP>
      )}
    </Container>
  );
}

export default SummaryContainer;
