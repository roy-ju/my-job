import MobGlobalNavigation from '@/components/organisms/MobGlobalNavigation';
import MobMapHeader from '@/components/organisms/MobMapHeader';

import MobMapLayout from '@/layouts/Mobile/MapLayout';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function MobileMapContainer({ children }: Props) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      <div tw="flex flex-col max-w-mobile min-h-screen my-0 mx-auto h-full">{children}</div>
    </>
  );
}

export default function Map() {
  return (
    <MobileMapContainer>
      <MobMapHeader value={10} />
      <MobMapLayout />
      <MobGlobalNavigation />
    </MobileMapContainer>
  );
}
