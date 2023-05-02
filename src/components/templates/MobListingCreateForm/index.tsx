import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { useMemo } from 'react';
import FormContext, { IFormContext } from './FormContext';
import FormRenderer from './FormRenderer';

export interface ListingCreateFormProps extends IFormContext {
  nextButtonDisabled?: boolean;

  addressLine1: string;
  addressLine2: string;

  forms?: string[];
  onClickNext?: () => void;
  onClickBack?: () => void;
}

export default function MobistingCreateForm({
  nextButtonDisabled,

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
  moveInDateType,
  hasMoveInDate,
  onChangeHasMoveInDate,
  specialTerms,
  hasSpecialTerms,

  verandaExtended,
  verandaRemodelling,
  onChangeVerandaExtended,
  onChangeVerandaRemodelling,

  extraOptions,
  onChangeExtraOptions,
  listingOptions,

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
  onChangeMoveInDateType,
  onChangeSpecialTerms,
  onChangeHasSpecialTerms,

  rentArea,
  hasRentArea,
  onChangeRentArea,
  onChangeHasRentArea,

  rentTermYear,
  rentTermMonth,
  rentTermNegotiable,
  onChangeRentTermMonth,
  onChangeRentTermNegotiable,
  onChangeRentTermYear,

  jeonsaeLoan,
  onChangeJeonsaeLoan,

  adminFee,
  onChangeAdminFee,

  listingPhotoUrls,
  onChangeListingPhotoUrls,

  danjiPhotoUrls,
  onChangeDanjiPhotoUrls,

  description,
  onChangeDescription,

  rentEndDate,
  onChangeRentEndDate,

  onClickBack,
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
      moveInDateType,
      hasMoveInDate,
      onChangeMoveInDate,
      onChangeMoveInDateType,
      onChangeHasMoveInDate,

      specialTerms,
      hasSpecialTerms,

      verandaExtended,
      verandaRemodelling,
      onChangeVerandaExtended,
      onChangeVerandaRemodelling,

      extraOptions,
      onChangeExtraOptions,
      listingOptions,

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

      onChangeSpecialTerms,
      onChangeHasSpecialTerms,

      remainingAmountDate,
      remainingAmountDateType,
      onChangeRemainingAmountDate,
      onChangeRemainingAmountDateType,

      rentArea,
      hasRentArea,
      onChangeRentArea,
      onChangeHasRentArea,

      rentTermYear,
      rentTermMonth,
      rentTermNegotiable,
      onChangeRentTermMonth,
      onChangeRentTermNegotiable,
      onChangeRentTermYear,

      jeonsaeLoan,
      onChangeJeonsaeLoan,

      adminFee,
      onChangeAdminFee,

      listingPhotoUrls,
      onChangeListingPhotoUrls,

      danjiPhotoUrls,
      onChangeDanjiPhotoUrls,

      description,
      onChangeDescription,

      rentEndDate,
      onChangeRentEndDate,
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
      moveInDateType,
      specialTerms,

      verandaExtended,
      verandaRemodelling,
      onChangeVerandaExtended,
      onChangeVerandaRemodelling,

      extraOptions,
      onChangeExtraOptions,
      listingOptions,

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
      onChangeMoveInDateType,

      remainingAmountDate,
      remainingAmountDateType,
      onChangeRemainingAmountDate,
      onChangeRemainingAmountDateType,

      rentArea,
      hasRentArea,
      onChangeRentArea,
      onChangeHasRentArea,

      rentTermYear,
      rentTermMonth,
      rentTermNegotiable,
      onChangeRentTermMonth,
      onChangeRentTermNegotiable,
      onChangeRentTermYear,

      jeonsaeLoan,
      onChangeJeonsaeLoan,

      adminFee,
      onChangeAdminFee,

      listingPhotoUrls,
      onChangeListingPhotoUrls,

      danjiPhotoUrls,
      onChangeDanjiPhotoUrls,

      description,
      onChangeDescription,

      rentEndDate,
      onChangeRentEndDate,

      hasMoveInDate,
      onChangeHasMoveInDate,

      hasSpecialTerms,
      onChangeHasSpecialTerms,
    ],
  );

  return (
    <div tw="w-full max-w-mobile mx-auto flex flex-col h-full bg-white">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>매물등록 신청</NavigationHeader.Title>
      </NavigationHeader>
      <FormContext.Provider value={context}>
        <div id="formContainer" tw="flex-1 min-h-0 overflow-auto">
          {addressLine1 && addressLine2 && (
            <div>
              <div tw="px-5 pt-6 pb-10">
                <div tw="text-b1 leading-none font-bold mb-3">매물 주소</div>
                <div tw="text-b1">{addressLine1}</div>
                <div tw="text-info">{addressLine2}</div>
              </div>
              <Separator />
            </div>
          )}

          {forms?.map((form, index) => (
            <div key={form}>
              <FormRenderer form={form} />
              {forms.length !== index + 1 && <Separator />}
            </div>
          ))}
        </div>
        <PersistentBottomBar>
          <Button onClick={onClickNext} tw="w-full" size="bigger" disabled={nextButtonDisabled}>
            다음
          </Button>
        </PersistentBottomBar>
      </FormContext.Provider>
    </div>
  );
}
