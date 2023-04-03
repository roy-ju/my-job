import { ReactNode } from 'react';

export interface MobileContainerProps {
  children?: ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return <div tw="max-w-mobile w-full mx-auto h-full overflow-x-hidden overflow-y-hidden">{children}</div>;
}
