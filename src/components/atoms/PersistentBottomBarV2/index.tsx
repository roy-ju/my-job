import { ReactNode } from 'react';

export interface PersistentBottomBarV2Props {
  children?: ReactNode;
}

export default function PersistentBottomBarV2({ children, ...others }: PersistentBottomBarV2Props) {
  return (
    <div tw="bg-white w-full py-3 px-5 shadow-[0px_0px_24px_rgba(0,0,0,0.08)]" {...others}>
      {children}
    </div>
  );
}
