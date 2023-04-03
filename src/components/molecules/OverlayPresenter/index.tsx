import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import tw from 'twin.macro';

export interface OverlayPresenterProps {
  position?: 'center' | 'top-left';
  dropShadow?: boolean;
  children?: ReactNode;
}

export default function OverlayPresenter({ position = 'center', dropShadow = true, children }: OverlayPresenterProps) {
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
          <div tw="w-fit h-fit">{children}</div>
        </div>,
        container,
      )
    : null;
}
