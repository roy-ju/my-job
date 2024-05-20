import { ReactNode, useEffect } from 'react';

import tw, { styled } from 'twin.macro';

export interface MobileContainerProps {
  children?: ReactNode;
  bottomNav?: JSX.Element | null;
  maxWidth?: string | number;
}

const Container = styled.div`
  ${tw`flex flex-col w-full h-full bg-white`}
`;

const ChildrenWrraper = styled.div`
  ${tw`relative w-full flex-1 min-h-0 my-0 mx-auto [z-index: 1] bg-white overflow-hidden`}
`;

const BottomNavWrraper = styled.div`
  ${tw`w-full mx-auto bg-white`}
`;

export default function MobileContainer({ children, bottomNav, maxWidth }: MobileContainerProps) {
  useEffect(() => {
    if (maxWidth) {
      const element = document?.getElementById('__next');

      if (element) {
        element.style.background = '#F3F0FF';
      }

      return () => {
        if (element) {
          element.style.background = 'white';
        }
      };
    }
  }, [maxWidth]);

  return (
    <Container style={maxWidth ? { maxWidth, margin: '0 auto' } : {}}>
      <ChildrenWrraper>{children}</ChildrenWrraper>
      {bottomNav && <BottomNavWrraper>{bottomNav}</BottomNavWrraper>}
    </Container>
  );
}
