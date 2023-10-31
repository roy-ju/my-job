import React, { ReactNode, useEffect, useState } from 'react';

import { AuthRequired, MobAuthRequired, MobileContainer, Panel } from '@/components/atoms';

import { usePlatform } from '@/providers/PlatformProvider';

type Props = {
  panelWidth?: string;

  children: ReactNode;

  auth?: boolean;

  ciRequired?: boolean;

  onAccessDenied?: () => void;
};

export default function Container({ panelWidth, children, auth, ciRequired, onAccessDenied }: Props) {
  const platform = usePlatform();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (platform?.platform === null || !isClient) return <div />;

  return (
    <>
      {platform?.platform === 'pc' &&
        (auth ? (
          <AuthRequired depth={platform?.depth} ciRequired={ciRequired} onAccessDenied={onAccessDenied}>
            <Panel width={panelWidth}>{children}</Panel>
          </AuthRequired>
        ) : (
          <Panel width={panelWidth}>{children}</Panel>
        ))}

      {platform?.platform === 'mobile' &&
        (auth ? (
          <MobAuthRequired ciRequired={ciRequired} onAccessDenied={onAccessDenied}>
            <MobileContainer>{children}</MobileContainer>
          </MobAuthRequired>
        ) : (
          <MobileContainer>{children}</MobileContainer>
        ))}
    </>
  );
}
