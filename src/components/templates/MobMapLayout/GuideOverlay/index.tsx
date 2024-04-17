/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useRef } from 'react';

import useScrollLock from '@/hooks/useScrollLock';

function Container({ onClick }: { onClick: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      onClick={onClick}
      ref={containerRef}
      tw="fixed w-full h-[100vh] overflow-auto [margin: 0 auto] top-0 left-0 right-0 bottom-0"
      style={{
        backgroundColor: '#000000',
        opacity: 0.75,
        zIndex: 9000,
        pointerEvents: 'auto',
      }}
    />
  );
}

export default function MobGuideOverlay({ disappearGuideOverlay }: { disappearGuideOverlay: () => void }) {
  useScrollLock();

  return <Container onClick={disappearGuideOverlay} />;
}
