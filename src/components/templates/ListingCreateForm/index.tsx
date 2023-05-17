import { Button, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { useMemo } from 'react';
import FormContext, { IFormContext } from './FormContext';
import FormRenderer from './FormRenderer';

export interface ListingCreateFormProps extends IFormContext {
  nextButtonDisabled?: boolean;

  addressLine1: string;
  addressLine2: string;

  dong: string;
  ho: string;

  forms?: string[];
  onClickNext?: () => void;
  onClickBack?: () => void;
}

export default function ListingCreateForm({
  isAddInterimButtonDisabled,
  isAddCollateralDisabled,
  isAddDebtSuccessionDisabled,

  nextButtonDisabled,

  addressLine1,
  addressLine2,

  dong,
  ho,

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
      isAddInterimButtonDisabled,
      isAddCollateralDisabled,
      isAddDebtSuccessionDisabled,

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

      dong,
      ho,
    }),
    [
      isAddInterimButtonDisabled,
      isAddCollateralDisabled,
      isAddDebtSuccessionDisabled,

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

      dong,
      ho,
    ],
  );

  return (
    <div tw="flex flex-col h-full">
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
                <div tw="text-info text-gray-700">
                  {addressLine2} {dong} {ho}
                </div>
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
          <div>
            <Button onClick={onClickNext} tw="w-full" size="bigger" disabled={nextButtonDisabled}>
              다음
            </Button>
            {forms && forms.length > 1 && (
              <p tw="text-info [line-height: 16px] [text-align: center] mt-[7px]">수정을 원하시면 위로 스크롤하세요.</p>
            )}
          </div>
        </PersistentBottomBar>
      </FormContext.Provider>
    </div>
  );
}
