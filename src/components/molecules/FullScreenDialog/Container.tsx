import { useRef } from 'react';

import tw, { styled } from 'twin.macro';

export const ContainerUI = styled.div`
  ${tw`fixed top-0 left-0 bottom-0 w-[100vw] h-[100%] overflow-hidden [z-index: 1300] pointer-events-none bg-transparent`}
`;

export default function Container({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <ContainerUI ref={containerRef} id="overlay-container">
      {children}
    </ContainerUI>
  );
}
