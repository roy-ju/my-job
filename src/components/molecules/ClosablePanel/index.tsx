import { Panel } from '@/components/atoms';
import { useIsPresent } from 'framer-motion';
import type { ReactNode } from 'react';
import CloseIcon from '@/assets/icons/close.svg';

interface Props {
  children?: ReactNode;
  closable?: boolean;
  width?: string;
  onClickClose?: () => void;
}

export default function ClosablePanel({ closable = true, width, children, onClickClose }: Props) {
  const isPresent = useIsPresent();

  return (
    <div tw="relative h-full w-fit">
      {closable && isPresent && (
        <button
          tw="absolute top-5 right-0 w-10 h-10 translate-x-full flex items-center justify-center z-[200] bg-nego p-2 text-white rounded-tr-lg rounded-br-lg"
          type="button"
          onClick={onClickClose}
        >
          <CloseIcon />
        </button>
      )}
      <Panel width={width}>{children}</Panel>
    </div>
  );
}
