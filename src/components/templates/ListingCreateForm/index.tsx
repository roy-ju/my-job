import { Button, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { useMemo } from 'react';
import FormContext, { IFormContext } from './FormContext';
import FormRenderer from './FormRenderer';

export interface ListingCreateFormProps extends IFormContext {
  addressLine1: string;
  addressLine2: string;

  forms?: string[];
  onClickNext?: () => void;
}

export default function ListingCreateForm({
  addressLine1,
  addressLine2,

  forms,
  isOwner,
  ownerName,
  ownerPhone,
  buyOrRent,
  price,
  monthlyRentFee,
  quickSale,

  contractAmount,
  contractAmountNegotiable,
  remainingAmount,
  remainingAmountDate,
  remainingAmountDateType,
  interims,

  debtSuccessionDeposit,
  debtSuccessionMiscs,

  collaterals,

  moveInDate,
  dateType,
  specialTerms,

  onChangeIsOwner,
  onChangeOwnerName,
  onChangeOwnerPhone,
  onChangeBuyOrRent,
  onChangePrice,
  onChangeMonthlyRentFee,
  onChangeQuickSale,
  onClickNext,

  onChangeContractAmount,
  onChangeContractAmountNegotiable,
  onChangeRemainingAmount,
  onChangeRemainingAmountDate,
  onChangeRemainingAmountDateType,
  onClickAddInterim,

  onChangeDebtSuccessionDeposit,
  onClickAddDebtSuccessionMisc,

  onClickAddCollateral,

  onChangeMoveInDate,
  onChangeDateType,
  onChangeSpecialTerms,

  rentArea,
  onChangeRentArea,

  rentTermYear,
  rentTermMonth,
  rentTermNegotiable,
  onChangeRentTermMonth,
  onChangeRentTermNegotiable,
  onChangeRentTermYear,
}: ListingCreateFormProps) {
  const context = useMemo(
    () => ({
      isOwner,
      ownerName,
      ownerPhone,
      buyOrRent,
      price,
      monthlyRentFee,
      quickSale,
      contractAmount,
      contractAmountNegotiable,
      remainingAmount,
      interims,

      debtSuccessionDeposit,
      debtSuccessionMiscs,
      collaterals,

      moveInDate,
      dateType,
      specialTerms,

      onChangeIsOwner,
      onChangeOwnerName,
      onChangeOwnerPhone,
      onChangeBuyOrRent,
      onChangePrice,
      onChangeMonthlyRentFee,
      onChangeQuickSale,
      onChangeContractAmount,
      onChangeContractAmountNegotiable,
      onChangeRemainingAmount,
      onClickAddInterim,
      onChangeDebtSuccessionDeposit,
      onClickAddDebtSuccessionMisc,
      onClickAddCollateral,

      onChangeMoveInDate,
      onChangeDateType,
      onChangeSpecialTerms,

      remainingAmountDate,
      remainingAmountDateType,
      onChangeRemainingAmountDate,
      onChangeRemainingAmountDateType,

      rentArea,
      onChangeRentArea,

      rentTermYear,
      rentTermMonth,
      rentTermNegotiable,
      onChangeRentTermMonth,
      onChangeRentTermNegotiable,
      onChangeRentTermYear,
    }),
    [
      isOwner,
      ownerName,
      ownerPhone,
      buyOrRent,
      price,
      monthlyRentFee,
      quickSale,
      contractAmount,
      contractAmountNegotiable,
      remainingAmount,
      interims,

      debtSuccessionDeposit,
      debtSuccessionMiscs,
      collaterals,

      moveInDate,
      dateType,
      specialTerms,

      onChangeIsOwner,
      onChangeOwnerName,
      onChangeOwnerPhone,
      onChangeBuyOrRent,
      onChangePrice,
      onChangeMonthlyRentFee,
      onChangeQuickSale,
      onChangeContractAmount,
      onChangeContractAmountNegotiable,
      onChangeRemainingAmount,
      onClickAddInterim,
      onChangeDebtSuccessionDeposit,
      onClickAddDebtSuccessionMisc,
      onClickAddCollateral,

      onChangeMoveInDate,
      onChangeSpecialTerms,
      onChangeDateType,

      remainingAmountDate,
      remainingAmountDateType,
      onChangeRemainingAmountDate,
      onChangeRemainingAmountDateType,

      rentArea,
      onChangeRentArea,

      rentTermYear,
      rentTermMonth,
      rentTermNegotiable,
      onChangeRentTermMonth,
      onChangeRentTermNegotiable,
      onChangeRentTermYear,
    ],
  );

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <FormContext.Provider value={context}>
        <div id="formContainer" tw="flex-1 min-h-0 overflow-auto">
          <div tw="px-5 pt-6 pb-10">
            <div tw="text-b1 leading-none font-bold mb-3">매물 주소</div>
            <div tw="text-b1">{addressLine1}</div>
            <div tw="text-info">{addressLine2}</div>
          </div>
          <Separator />
          {forms?.map((form, index) => (
            <div key={form}>
              <FormRenderer form={form} />
              {forms.length !== index + 1 && <Separator />}
            </div>
          ))}

          <div id="formSubmitContainer" tw="px-5 pb-20">
            <Button onClick={onClickNext} tw="w-full" size="bigger">
              다음
            </Button>
          </div>
        </div>
      </FormContext.Provider>
    </div>
  );
}
