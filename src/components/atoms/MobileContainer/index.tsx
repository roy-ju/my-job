import { ReactNode } from 'react';

export interface MobileContainerProps {
  children?: ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      <div tw="max-w-mobile min-h-screen my-0 mx-auto h-full">{children}</div>
    </>
  );
}
