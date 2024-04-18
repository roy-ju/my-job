import { ReactNode } from 'react';

import { createPortal } from 'react-dom';

import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 flex flex-col w-full h-full z-[1000] pointer-events-auto`}
`;

const Div = styled.div`
  ${tw``}
`;

export interface BottomSheetOverlayPresenterProps {
  style?: React.CSSProperties;
  children?: ReactNode;
  handleClick?: () => void;
}

export default function BottomSheetOverlayPresenter({
  style,
  children,
  handleClick,
}: BottomSheetOverlayPresenterProps) {
  const container = typeof window !== 'undefined' && document.getElementById('rootOverlay');

  return container && children
    ? createPortal(
        <Container
          onClick={() => {
            handleClick?.();
          }}
          style={style}
        >
          <Div onClick={(e) => e.stopPropagation()}>{children}</Div>
        </Container>,
        container,
      )
    : null;
}
