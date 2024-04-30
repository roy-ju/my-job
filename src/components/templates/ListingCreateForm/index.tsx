import { useMemo } from 'react';

import { ButtonV2, PersistentBottomBar, Separator } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import FormContext, { IFormContext } from './FormContext';

import FormRenderer from './FormRenderer';

export interface ListingCreateFormProps extends IFormContext {
  nextButtonDisabled?: boolean;

  forms?: string[];

  onClickNext?: () => void;
  onClickBack?: () => void;
}

export default function ListingCreateForm({
  isAddCollateralDisabled,
  isAddDebtSuccessionDisabled,

  nextButtonDisabled,
  onClickNext,

  forms,

  buyOrRent,
  onChangeBuyOrRent,

  price,
  onChangePrice,

  monthlyRentFee,
  onChangeMonthlyRentFee,

  quickSale,
  onChangeQuickSale,

  hasDebtSuccession,
  onChangeHasDebtSuccession,

  debtSuccessionDeposit,
  onChangeDebtSuccessionDeposit,

  debtSuccessionMiscs,
  onClickAddDebtSuccessionMisc,

  collaterals,
  onClickAddCollateral,

  specialTerms,
  onChangeSpecialTerms,

  hasSpecialTerms,
  onChangeHasSpecialTerms,

  hasMoveInDate,
  onChangeHasMoveInDate,

  moveInDate,
  onChangeMoveInDate,

  moveInDateType,
  onChangeMoveInDateType,

  verandaExtended,
  onChangeVerandaExtended,

  verandaRemodelling,
  onChangeVerandaRemodelling,

  extraOptions,
  onChangeExtraOptions,

  listingOptions,

  hasRentArea,
  onChangeHasRentArea,

  rentArea,
  onChangeRentArea,

  rentTermYear,
  onChangeRentTermMonth,

  rentTermMonth,
  onChangeRentTermYear,

  rentTermNegotiable,
  onChangeRentTermNegotiable,

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
      isAddCollateralDisabled,
      isAddDebtSuccessionDisabled,

      nextButtonDisabled,
      onClickNext,

      forms,

      buyOrRent,
      onChangeBuyOrRent,

      price,
      onChangePrice,

      monthlyRentFee,
      onChangeMonthlyRentFee,

      quickSale,
      onChangeQuickSale,

      hasDebtSuccession,
      onChangeHasDebtSuccession,

      debtSuccessionDeposit,
      onChangeDebtSuccessionDeposit,

      debtSuccessionMiscs,
      onClickAddDebtSuccessionMisc,

      collaterals,
      onClickAddCollateral,

      specialTerms,
      onChangeSpecialTerms,

      hasSpecialTerms,
      onChangeHasSpecialTerms,

      hasMoveInDate,
      onChangeHasMoveInDate,

      moveInDate,
      onChangeMoveInDate,

      moveInDateType,
      onChangeMoveInDateType,

      verandaExtended,
      onChangeVerandaExtended,

      verandaRemodelling,
      onChangeVerandaRemodelling,

      extraOptions,
      onChangeExtraOptions,

      listingOptions,

      hasRentArea,
      onChangeHasRentArea,

      rentArea,
      onChangeRentArea,

      rentTermYear,
      onChangeRentTermMonth,

      rentTermMonth,
      onChangeRentTermYear,

      rentTermNegotiable,
      onChangeRentTermNegotiable,

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
    }),
    [
      adminFee,
      buyOrRent,
      collaterals,
      danjiPhotoUrls,
      debtSuccessionDeposit,
      debtSuccessionMiscs,
      description,
      extraOptions,
      forms,
      hasDebtSuccession,
      hasMoveInDate,
      hasRentArea,
      hasSpecialTerms,
      isAddCollateralDisabled,
      isAddDebtSuccessionDisabled,
      jeonsaeLoan,
      listingOptions,
      listingPhotoUrls,
      monthlyRentFee,
      moveInDate,
      moveInDateType,
      nextButtonDisabled,
      onChangeAdminFee,
      onChangeBuyOrRent,
      onChangeDanjiPhotoUrls,
      onChangeDebtSuccessionDeposit,
      onChangeDescription,
      onChangeExtraOptions,
      onChangeHasDebtSuccession,
      onChangeHasMoveInDate,
      onChangeHasRentArea,
      onChangeHasSpecialTerms,
      onChangeJeonsaeLoan,
      onChangeListingPhotoUrls,
      onChangeMonthlyRentFee,
      onChangeMoveInDate,
      onChangeMoveInDateType,
      onChangePrice,
      onChangeQuickSale,
      onChangeRentArea,
      onChangeRentEndDate,
      onChangeRentTermMonth,
      onChangeRentTermNegotiable,
      onChangeRentTermYear,
      onChangeSpecialTerms,
      onChangeVerandaExtended,
      onChangeVerandaRemodelling,
      onClickAddCollateral,
      onClickAddDebtSuccessionMisc,
      onClickBack,
      onClickNext,
      price,
      quickSale,
      rentArea,
      rentEndDate,
      rentTermMonth,
      rentTermNegotiable,
      rentTermYear,
      specialTerms,
      verandaExtended,
      verandaRemodelling,
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
          {forms?.map((form, index) => (
            <div key={form}>
              <FormRenderer form={form} />
              {forms.length !== index + 1 && <Separator />}
            </div>
          ))}
        </div>
        <PersistentBottomBar>
          <div>
            <ButtonV2 onClick={onClickNext} tw="w-full" size="bigger" disabled={nextButtonDisabled}>
              다음
            </ButtonV2>
            {forms && forms.length > 1 && (
              <p tw="text-info [line-height: 16px] [text-align: center] mt-[7px]">수정을 원하시면 위로 스크롤하세요.</p>
            )}
          </div>
        </PersistentBottomBar>
      </FormContext.Provider>
    </div>
  );
}
