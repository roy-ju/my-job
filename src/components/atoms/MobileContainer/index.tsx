import { ReactNode } from 'react';

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
  return (
    <Container style={{ maxWidth }}>
      <ChildrenWrraper>{children}</ChildrenWrraper>
      {bottomNav && <BottomNavWrraper>{bottomNav}</BottomNavWrraper>}
    </Container>
  );
}
