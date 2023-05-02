import { ReactNode } from 'react';

export interface MobileContainerProps {
  children?: ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      <div tw="relative max-w-mobile w-full h-full my-0 mx-auto [z-index: 1] bg-white overflow-hidden">{children}</div>
    </>
  );
}
