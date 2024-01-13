import { ReactNode, useRef } from 'react';

import tw from 'twin.macro';

import useOutsideClick from '@/hooks/useOutsideClick';

interface OutsideClickProps {
  onOutsideClick?: () => void;
  children: ReactNode;
  radiusType?: number;
}

export default function OutsideClick({ onOutsideClick, children, radiusType }: OutsideClickProps) {
  const outsideRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: outsideRef,
    handler: onOutsideClick,
  });

  return (
    <div
      ref={outsideRef}
      css={[radiusType === 1 && tw`[border-top-left-radius: 20px] [border-top-right-radius: 20px]`]}
    >
      {children}
    </div>
  );
}
