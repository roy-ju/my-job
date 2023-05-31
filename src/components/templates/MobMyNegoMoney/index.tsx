import { NavigationHeader } from '@/components/molecules';
import { MobMyNegoMoney as MobMyNegoMoneyOrganism } from '@/components/organisms';
import React from 'react';

export interface NegoMoneyProps {
  totalMoney?: number;
  onClickBack?: () => void;
}

export default function MobMyNegoMoney({ totalMoney, onClickBack }: NegoMoneyProps) {
  return (
    <div tw="w-full max-w-mobile mx-auto fixed right-0 left-0 h-full flex flex-col bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>네고머니</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 flex flex-col min-h-0">
        <MobMyNegoMoneyOrganism totalMoney={totalMoney} />
      </div>
    </div>
  );
}
