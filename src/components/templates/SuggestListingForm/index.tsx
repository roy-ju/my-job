import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { SuggestListingFormOrganisms } from '@/components/organisms';
import React from 'react';

interface Props {
  data?: GetSuggestDetailResponse;

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

  loading?: boolean;
  disabledCTA?: boolean;
  handleCTA?: () => Promise<void>;
}

export default function SuggestListingForm({
  data,

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

  onClickBack,

  loading,
  disabledCTA,
  handleCTA,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물 추천하기</NavigationHeader.Title>
      </NavigationHeader>

      <div tw="mt-7">
        <SuggestListingFormOrganisms>
          <SuggestListingFormOrganisms.Info data={data} />
          <Separator tw="bg-gray-300" />
          <SuggestListingFormOrganisms.Guide />
          <Separator tw="bg-gray-300" />
          <SuggestListingFormOrganisms.Form
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
        </SuggestListingFormOrganisms>
      </div>

      <PersistentBottomBar>
        <div tw="[padding-bottom: 26px]">
          <Button size="bigger" tw="w-full" disabled={disabledCTA} onClick={handleCTA} isLoading={loading}>
            추천하기
          </Button>
        </div>
      </PersistentBottomBar>
    </div>
  );
}
