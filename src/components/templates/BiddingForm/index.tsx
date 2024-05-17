import { useMemo } from 'react';

import { Button, Loading, PersistentBottomBar, Separator } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import ListingSummaryCard from '@/components/organisms/listing/ListingSummaryCard';

import FormRenderer from './FormRenderer';

import FormContext, { IFormContext } from './FormContext';

interface Props extends IFormContext {
  headerTitle?: string;
  forms?: string[];
  displayAddress?: string;
  nextButtonDisabled?: boolean;
  onClickCancelBidding?: () => void;
  onClickNext?: () => void;
  onClickBack?: () => void;
}

export default function BiddingForm({
  headerTitle = '가격제안',

  listing,
  displayAddress,

  type,
  onChangeType,

  price,
  onChangePrice,

  monthlyRentFee,
  onChangeMonthlyRentFee,

  moveInDate,
  onChangeMoveInDate,

  moveInDateType,
  onChangeMoveInDateType,

  etcs,
  onChangeEtcs,

  description,
  onChangeDescription,

  onClickBack,
  onClickCancelBidding,

  nextButtonDisabled,
  onClickNext,
}: Props) {
  const context = useMemo(
    () => ({
      listing,

      type,
      onChangeType,

      price,
      onChangePrice,

      monthlyRentFee,
      onChangeMonthlyRentFee,

      moveInDate,
      onChangeMoveInDate,

      moveInDateType,
      onChangeMoveInDateType,

      etcs,
      onChangeEtcs,

      description,
      onChangeDescription,
    }),
    [
      listing,
      type,
      price,
      monthlyRentFee,
      moveInDate,
      moveInDateType,
      etcs,
      description,
      onChangeType,
      onChangePrice,
      onChangeMonthlyRentFee,
      onChangeMoveInDate,
      onChangeMoveInDateType,
      onChangeEtcs,
      onChangeDescription,
    ],
  );

  if (!listing)
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>{headerTitle}</NavigationHeader.Title>
        {onClickCancelBidding && (
          <NavigationHeader.Button onClick={onClickCancelBidding} tw="text-info underline">
            제안취소
          </NavigationHeader.Button>
        )}
      </NavigationHeader>
      <FormContext.Provider value={context}>
        <div id="formContainer" tw="flex-1 min-h-0 overflow-auto">
          <div tw="px-5 pb-10 pt-7">
            <ListingSummaryCard
              listingTitle={listing?.listing_title ?? ''}
              address={displayAddress ?? ''}
              area={listing?.jeonyong_area ?? ''}
              floorDescription={listing?.floor_description ?? ''}
              floor={listing?.floor ?? ''}
              direction={listing?.direction ?? ''}
            />
          </div>
          <Separator />
          <FormRenderer />
        </div>
      </FormContext.Provider>
      <PersistentBottomBar>
        <div>
          <Button disabled={nextButtonDisabled} onClick={onClickNext} tw="w-full" size="bigger">
            다음
          </Button>
          <p tw="text-info [line-height: 16px] [text-align: center] mt-[7px]">수정을 원하시면 위로 스크롤하세요.</p>
        </div>
      </PersistentBottomBar>
    </div>
  );
}
