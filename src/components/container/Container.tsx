import React, { ReactNode } from 'react';

import { AuthRequired, MobAuthRequired, MobileContainer, Panel } from '@/components/atoms';

import { usePlatform } from '@/providers/PlatformProvider';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import { MobGlobalNavigation } from '../organisms';

type Props = {
  panelWidth?: string;

  children: ReactNode;

  auth?: boolean;

  ciRequired?: boolean;

  onAccessDenied?: () => void;

  bottomNavigation?: Nullable<{
    navigationIndex: 1 | 2 | 3 | 4 | 5;
  }>;
};

export default function Container({
  panelWidth,
  children,
  auth,
  ciRequired,
  bottomNavigation = null,
  onAccessDenied,
}: Props) {
  const platform = usePlatform();

  const { unreadChatCount } = useSyncronizer();

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
            <MobileContainer
              bottomNav={
                bottomNavigation ? (
                  <MobGlobalNavigation index={bottomNavigation.navigationIndex} unreadChatCount={unreadChatCount} />
                ) : null
              }
            >
              {children}
            </MobileContainer>
          </MobAuthRequired>
        ) : (
          <MobileContainer
            bottomNav={
              bottomNavigation ? (
                <MobGlobalNavigation index={bottomNavigation.navigationIndex} unreadChatCount={unreadChatCount} />
              ) : null
            }
          >
            {children}
          </MobileContainer>
        ))}
    </>
  );
}
