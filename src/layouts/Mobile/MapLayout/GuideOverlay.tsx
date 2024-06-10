import { useRef } from 'react';

import tw, { styled } from 'twin.macro';

import useScrollLock from '@/hooks/useScrollLock';

const Container = styled.div`
  ${tw`fixed w-full h-[100vh] overflow-auto [margin: 0 auto] top-0 left-0 right-0 bottom-0`}
`;

function GuideOverayContainer({ onClick }: { onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Container
      onClick={onClick}
      ref={containerRef}
      style={{
        backgroundColor: '#000000',
        opacity: 0.75,
        zIndex: 9000,
        pointerEvents: 'auto',
      }}
    />
  );
}

export default function GuideOverlay({ disappearGuideOverlay }: { disappearGuideOverlay: () => void }) {
  useScrollLock();

  return <GuideOverayContainer onClick={disappearGuideOverlay} />;
}
