import { NavigationHeader } from '@/components/molecules';
import { MobMyNegoMoney as MobMyNegoMoneyOrganism } from '@/components/organisms';
import React from 'react';

export interface NegoMoneyProps {
  totalMoney?: number;
}

export default function MobMyNegoMoney({ totalMoney }: NegoMoneyProps) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.Title>네고머니</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 flex flex-col min-h-0">
        <MobMyNegoMoneyOrganism totalMoney={totalMoney} />
      </div>
    </div>
  );
}
