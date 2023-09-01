import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { SuggestMyListingOrganisms } from '@/components/organisms';
import React from 'react';

interface Props {
  address?: string;
  onChangeAddress?: (val: string) => void;

  buyOrRent?: number;
  onChangeBuyOrRent?: (val: number | undefined) => void;

  tradePrice?: string;
  onChangePrice?: (val: string) => void;

  monthlyRentFee?: string;
  onChangeMonthlyRentFee?: (val: string) => void;

  floor?: string;
  onChangeFloor?: (val: string) => void;

  pyoungArea?: string;
  onChangePyoungArea?: (val: string) => void;

  meterArea?: string;
  onChangeMeterArea?: (val: string) => void;

  direction?: string;
  onChangeDirection?: (val: string) => void;

  description?: string;
  onChangeDescription?: (val: string) => void;

  onClickBack?: () => void;
  disabledCTA?: boolean;
}

export default function SuggestMyListing({
  address,
  onChangeAddress,

  buyOrRent,
  onChangeBuyOrRent,

  tradePrice,
  onChangePrice,

  monthlyRentFee,
  onChangeMonthlyRentFee,

  floor,
  onChangeFloor,

  pyoungArea,
  onChangePyoungArea,

  meterArea,
  onChangeMeterArea,

  direction,
  onChangeDirection,

  description,
  onChangeDescription,

  disabledCTA,
  onClickBack,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물 추천하기</NavigationHeader.Title>
      </NavigationHeader>

      <div tw="mt-7">
        <SuggestMyListingOrganisms>
          <SuggestMyListingOrganisms.Info />
          <Separator tw="bg-gray-300" />
          <SuggestMyListingOrganisms.Guide />
          <Separator tw="bg-gray-300" />
          <SuggestMyListingOrganisms.Form
            address={address}
            onChangeAddress={onChangeAddress}
            buyOrRent={buyOrRent}
            onChangeBuyOrRent={onChangeBuyOrRent}
            tradePrice={tradePrice}
            onChangePrice={onChangePrice}
            monthlyRentFee={monthlyRentFee}
            onChangeMonthlyRentFee={onChangeMonthlyRentFee}
            floor={floor}
            onChangeFloor={onChangeFloor}
            pyoungArea={pyoungArea}
            onChangePyoungArea={onChangePyoungArea}
            meterArea={meterArea}
            onChangeMeterArea={onChangeMeterArea}
            direction={direction}
            onChangeDirection={onChangeDirection}
            description={description}
            onChangeDescription={onChangeDescription}
          />
        </SuggestMyListingOrganisms>
      </div>

      <PersistentBottomBar>
        <div tw="[padding-bottom: 26px]">
          <Button size="bigger" tw="w-full" disabled={disabledCTA}>
            추천하기
          </Button>
        </div>
      </PersistentBottomBar>
    </div>
  );
}
