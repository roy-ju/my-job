import { Panel } from '@/components/atoms';
import { useIsPresent } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  closable?: boolean;
  onClickClose?: () => void;
};

export default function ClosablePanel({
  closable = false,
  children,
  onClickClose,
}: Props) {
  const isPresent = useIsPresent();

  return (
    <div tw="relative overflow-x-visible">
      {closable && isPresent && (
        <button
          tw="absolute top-0 right-0 translate-x-full min-w-max z-[200] bg-gray-800 p-2 text-white"
          type="button"
          onClick={onClickClose}
        >
          닫기
        </button>
      )}
      <Panel>{children}</Panel>
    </div>
  );
}
