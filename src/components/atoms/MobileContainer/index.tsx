import { ReactNode } from 'react';

export interface MobileContainerProps {
  children?: ReactNode;
  bottomNav?: JSX.Element | null;
}

export default function MobileContainer({ children, bottomNav }: MobileContainerProps) {
  return (
    <div tw="flex flex-col w-full h-full bg-nego-1300">
      <div tw="relative w-full flex-1 min-h-0 my-0 mx-auto [z-index: 1] bg-white overflow-hidden">{children}</div>
      {bottomNav && <div tw="w-full mx-auto bg-white">{bottomNav}</div>}
    </div>
  );
}
