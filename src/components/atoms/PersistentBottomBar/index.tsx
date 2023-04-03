import { ReactNode } from 'react';

export interface PersistentBottomBarProps {
  children?: ReactNode;
}

export default function PersistentBottomBar({ children }: PersistentBottomBarProps) {
  return <div tw="bg-white w-full py-4 px-5 shadow-[0px_0px_24px_rgba(0,0,0,0.08)]">{children}</div>;
}
