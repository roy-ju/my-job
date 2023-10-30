import React, { ReactNode } from 'react';

import { MobileContainer, Panel } from '@/components/atoms';

import usePlatform from '../hooks/usePlatform';

type Props = { panelWidth?: string; children: ReactNode };

export default function Container({ panelWidth, children }: Props) {
  const platform = usePlatform();

  if (platform?.platform === null) return null;

  return (
    <>
      {platform?.platform === 'pc' ? (
        <Panel width={panelWidth}>{children}</Panel>
      ) : (
        <MobileContainer>{children}</MobileContainer>
      )}
    </>
  );
}
