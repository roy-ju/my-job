import { ReactNode } from 'react';

export interface MobileContainerProps {
  children?: ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return <div tw="w-full h-full overflow-x-hidden overflow-y-auto">{children}</div>;
}
