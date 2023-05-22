import { NavigationHeader } from '@/components/molecules';
import { Button, Loading, PersistentBottomBar, Separator } from '@/components/atoms';
import { useMemo } from 'react';
import { ListingSummaryCard } from '@/components/organisms';
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

  forms,
  nextButtonDisabled,
  onClickNext,

  listing,
  displayAddress,

  type,
  onChangeType,

  price,
  monthlyRentFee,
  onChangePrice,
  onChangeMonthlyRentFee,

  canHaveMoreContractAmount,
  onChangeCanHaveMoreContractAmount,
  contractAmount,
  onChangeContractAmount,

  canHaveMoreInterimAmount,
  onChangeCanHaveMoreInterimAmount,
  interimAmount,
  onChangeInterimAmount,

  canHaveEarilerRemainingAmountDate,
  onChangeCanHaveEarilerRemainingAmountDate,
  remainingAmountDate,
  remainingAmountDateType,
  onChangeRemainingAmountDate,
  onChangeRemainingAmountDateType,

  canHaveEarilerMoveInDate,
  onChangeCanHaveEarilerMoveInDate,
  moveInDate,
  moveInDateType,
  onChangeMoveInDate,
  onChangeMoveInDateType,

  etcs,
  onChangeEtcs,

  description,
  onChangeDescription,

  onClickBack,
  onClickCancelBidding,
}: Props) {
  const context = useMemo(
    () => ({
      listing,

      type,
      onChangeType,

      price,
      monthlyRentFee,
      onChangePrice,
      onChangeMonthlyRentFee,

      canHaveMoreContractAmount,
      onChangeCanHaveMoreContractAmount,
      contractAmount,
      onChangeContractAmount,

      canHaveMoreInterimAmount,
      onChangeCanHaveMoreInterimAmount,
      interimAmount,
      onChangeInterimAmount,

      canHaveEarilerRemainingAmountDate,
      onChangeCanHaveEarilerRemainingAmountDate,
      remainingAmountDate,
      remainingAmountDateType,
      onChangeRemainingAmountDate,
      onChangeRemainingAmountDateType,

      canHaveEarilerMoveInDate,
      onChangeCanHaveEarilerMoveInDate,
      moveInDate,
      moveInDateType,
      onChangeMoveInDate,
      onChangeMoveInDateType,

      etcs,
      onChangeEtcs,

      description,
      onChangeDescription,
    }),
    [
      listing,

      type,
      onChangeType,

      price,
      monthlyRentFee,
      onChangePrice,
      onChangeMonthlyRentFee,

      canHaveMoreContractAmount,
      onChangeCanHaveMoreContractAmount,
      contractAmount,
      onChangeContractAmount,

      canHaveMoreInterimAmount,
      onChangeCanHaveMoreInterimAmount,
      interimAmount,
      onChangeInterimAmount,

      canHaveEarilerRemainingAmountDate,
      onChangeCanHaveEarilerRemainingAmountDate,
      remainingAmountDate,
      remainingAmountDateType,
      onChangeRemainingAmountDate,
      onChangeRemainingAmountDateType,

      canHaveEarilerMoveInDate,
      onChangeCanHaveEarilerMoveInDate,
      moveInDate,
      moveInDateType,
      onChangeMoveInDate,
      onChangeMoveInDateType,

      etcs,
      onChangeEtcs,

      description,
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
          <div tw="px-5 py-7">
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

          {forms?.map((form, index) => (
            <div key={form}>
              <FormRenderer form={form} />
              {forms.length !== index + 1 && (
                <div tw="py-3">
                  <Separator />
                </div>
              )}
            </div>
          ))}
        </div>
      </FormContext.Provider>
      <PersistentBottomBar>
        <div>
          <Button disabled={nextButtonDisabled} onClick={onClickNext} tw="w-full" size="bigger">
            다음
          </Button>
          {forms && forms.length > 1 && (
            <p tw="text-info [line-height: 16px] [text-align: center] mt-[7px]">수정을 원하시면 위로 스크롤하세요.</p>
          )}
        </div>
      </PersistentBottomBar>
    </div>
  );
}
