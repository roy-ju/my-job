import { useOutsideClick } from '@/hooks/utils';
import { ReactNode, useRef } from 'react';

interface OutsideClickProps {
  onOutsideClick?: () => void;
  children: ReactNode;
}

export default function OutsideClick({ onOutsideClick, children }: OutsideClickProps) {
  const outsideRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref: outsideRef,
    handler: onOutsideClick,
  });

  return <div ref={outsideRef}>{children}</div>;
}
