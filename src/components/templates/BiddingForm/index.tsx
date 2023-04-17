import { NavigationHeader } from '@/components/molecules';
import { Button, Loading, PersistentBottomBar, Separator } from '@/components/atoms';
import { useMemo } from 'react';
import FormRenderer from './FormRenderer';
import FormContext, { IFormContext } from './FormContext';

interface Props extends IFormContext {
  forms?: string[];
  onClickNext?: () => void;
}

export default function BiddingForm({
  forms,
  onClickNext,

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
        <NavigationHeader.Title>가격제안</NavigationHeader.Title>
      </NavigationHeader>
      <FormContext.Provider value={context}>
        <div id="formContainer" tw="flex-1 min-h-0 overflow-auto">
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
        <Button onClick={onClickNext} tw="w-full" size="bigger">
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
