/* eslint-disable react/no-array-index-key */
import { Button, Separator } from '@/components/atoms';
import { ListingCreateForm as Form } from '@/components/organisms';
import { BuyOrRent } from '@/constants/enums';
import { useContext } from 'react';
import tw from 'twin.macro';
import FormContext from './FormContext';

export const Forms = {
  IsOwner: 'isOwner',
  BuyOrRent: 'buyOrRent',
  Price: 'price',
  DebtSuccessions: 'debtSuccessions',
  Collaterals: 'collaterals',
  PaymentSchedules: 'paymentSchedule',
  SpecialTerms: 'specialTerms',
  Optionals: 'optionals',
  MoveInDate: 'moveInDate',
  RentArea: 'rentArea',
  RentTerm: 'rentTerm',
  JeonsaeLoan: 'jeonsaeLoan',
  RentEndDate: 'rentEndDate',
};

interface Props {
  form: string;
}

export default function FormRenderer({ form }: Props) {
  const isPermSettingsSupported =
    typeof window !== 'undefined' &&
    (!!window.Android?.goToAppPermissionSettings || !!window.webkit?.messageHandlers?.goToAppPermissionSettings);

  const {
    hasDebtSuccession,
    onChangeHasDebtSuccession,

    isAddInterimButtonDisabled,
    isAddCollateralDisabled,
    isAddDebtSuccessionDisabled,

    // IsOwner
    isOwner,
    onChangeIsOwner,
    // OwnerInfo
    ownerName,
    ownerPhone,
    onChangeOwnerName,
    onChangeOwnerPhone,
    // BuyOrRent
    buyOrRent,
    onChangeBuyOrRent,
    // Price
    price,
    monthlyRentFee,
    quickSale,
    onChangePrice,
    onChangeMonthlyRentFee,
    onChangeQuickSale,
    // 희망 지급일정
    contractAmount,
    contractAmountNegotiable,
    remainingAmount,

    interims,
    onChangeContractAmount,
    onChangeContractAmountNegotiable,
    onChangeRemainingAmount,
    onClickAddInterim,

    // 채무승계
    debtSuccessionDeposit,
    debtSuccessionMiscs,
    onChangeDebtSuccessionDeposit,
    onClickAddDebtSuccessionMisc,
    // 선순위 담보권
    collaterals,
    onClickAddCollateral,

    // 입주가능시기
    moveInDate,
    moveInDateType,
    hasMoveInDate,
    onChangeMoveInDate,
    onChangeMoveInDateType,
    onChangeHasMoveInDate,

    // 특약사항
    specialTerms,
    hasSpecialTerms,
    onChangeSpecialTerms,
    onChangeHasSpecialTerms,

    // 임대할 부분
    rentArea,
    hasRentArea,
    onChangeRentArea,
    onChangeHasRentArea,
    // 베란다 확장
    verandaExtended,
    onChangeVerandaExtended,

    // 2년 내 올수리
    verandaRemodelling,
    onChangeVerandaRemodelling,

    // 추가 옵션
    extraOptions,
    onChangeExtraOptions,
    listingOptions,

    rentTermMonth,
    rentTermYear,
    rentTermNegotiable,
    onChangeRentTermMonth,
    onChangeRentTermYear,
    onChangeRentTermNegotiable,

    jeonsaeLoan,
    onChangeJeonsaeLoan,

    listingPhotoUrls,
    onChangeListingPhotoUrls,

    danjiPhotoUrls,
    onChangeDanjiPhotoUrls,

    description,
    onChangeDescription,

    rentEndDate,
    onChangeRentEndDate,
  } = useContext(FormContext);

  switch (form) {
    case Forms.IsOwner:
      return (
        <div>
          <div id={Forms.IsOwner} tw="px-5 pt-10 pb-5">
            <Form.IsOwner isOwner={isOwner} onChangeIsOwner={onChangeIsOwner} />
          </div>
          {!isOwner && (
            <div tw="px-5 pt-0 pb-10">
              <Form.OwnerInfo
                name={ownerName}
                phone={ownerPhone}
                onChangeName={(e) => onChangeOwnerName?.(e.target.value)}
                onChangePhone={(e) => onChangeOwnerPhone?.(e.target.value)}
                onClickNameDeleteIcon={() => onChangeOwnerName?.('')}
                onClickPhoneDeleteIcon={() => onChangeOwnerPhone?.('')}
              />
            </div>
          )}
        </div>
      );
    case Forms.BuyOrRent:
      return (
        <div id={Forms.BuyOrRent} tw="px-5 py-10">
          <Form.BuyOrRent value={buyOrRent} onChange={onChangeBuyOrRent} />
        </div>
      );
    case Forms.Price:
      return (
        <div id={Forms.Price} tw="px-5 py-10">
          <Form.Price
            buyOrRent={buyOrRent ?? BuyOrRent.Buy}
            price={price}
            quickSale={quickSale}
            monthlyRentFee={monthlyRentFee}
            onChangePrice={onChangePrice}
            onChangeMonthlyRentFee={onChangeMonthlyRentFee}
            onChangeQuickSale={onChangeQuickSale}
          />
        </div>
      );
    case Forms.DebtSuccessions:
      return (
        <div id={Forms.DebtSuccessions}>
          <div tw="px-5 pt-7 pb-3">
            <Form.DebtSuccession
              hasDebtSuccession={hasDebtSuccession}
              isAddButtonDisabled={isAddDebtSuccessionDisabled}
              deposit={debtSuccessionDeposit}
              onChangeHasDebtSuccession={onChangeHasDebtSuccession}
              onChangeDeposit={onChangeDebtSuccessionDeposit}
              onClickAdd={onClickAddDebtSuccessionMisc}
            />
          </div>

          {hasDebtSuccession === '1' && (
            <div tw="px-5 pt-7 pb-3">
              <Form.RentEndDate date={rentEndDate} onChangeDate={onChangeRentEndDate} />
            </div>
          )}

          {debtSuccessionMiscs?.map((debtSuccession, index) => (
            <div key={debtSuccession.key} tw="px-5 py-7 border-t-0">
              <Form.DebtSuccession.Miscellaneous
                index={index}
                name={debtSuccession.name}
                price={debtSuccession.price}
                onChangeName={debtSuccession.onChangeName}
                onChangePrice={debtSuccession.onChangePrice}
                onClickRemove={debtSuccession.onRemove}
              />
            </div>
          ))}

          <div tw="px-5 pt-7 pb-10" css={[debtSuccessionMiscs && debtSuccessionMiscs.length > 0 && tw`pt-5`]}>
            <Form.MoveInDate
              disabled={!!rentEndDate}
              date={moveInDate}
              dateType={moveInDateType}
              hasDate={hasMoveInDate}
              onChangeDate={onChangeMoveInDate}
              onChangeDateType={onChangeMoveInDateType}
              onChangeHasDate={onChangeHasMoveInDate}
            />
          </div>
        </div>
      );

    case Forms.Collaterals:
      return (
        <div id={Forms.Collaterals}>
          <div tw="px-5 py-10">
            <Form.Collateral isAddButtonDisabled={isAddCollateralDisabled} onClickAdd={onClickAddCollateral} />
          </div>
          {collaterals?.map((collateral, index) => (
            <div key={collateral.key} tw="px-4 pb-10">
              <Form.Collateral.Item
                index={index}
                name={collateral.name}
                price={collateral.price}
                onChangeName={collateral.onChangeName}
                onChangePrice={collateral.onChangePrice}
                onClickRemove={collateral.onRemove}
              />
            </div>
          ))}
        </div>
      );

    case Forms.PaymentSchedules:
      return (
        <div id={Forms.PaymentSchedules} tw="py-10">
          <div tw="pb-7 px-5">
            <Form.PaymentSchedule
              isAddButtonDisabled={isAddInterimButtonDisabled}
              price={price}
              debtSuccessionDeposit={debtSuccessionDeposit}
              debtSuccessionMiscs={debtSuccessionMiscs}
              showCalculator={buyOrRent === BuyOrRent.Buy}
              onClickAddInterim={onClickAddInterim}
            />
          </div>
          <div tw="px-5 pb-7 border-b border-b-gray-300">
            <Form.ContractAmount
              price={contractAmount}
              negotiable={contractAmountNegotiable}
              onChangePrice={onChangeContractAmount}
              onChangeNegotiable={onChangeContractAmountNegotiable}
            />
          </div>
          {interims?.map((interim, index) => (
            <div key={interim.key} tw="px-5 py-7 flex flex-col gap-4 border-b border-b-gray-300">
              <Form.InterimAmount
                index={index}
                price={interim.price}
                negotiable={interim.negotiable}
                onChangePrice={interim.onChangePrice}
                onChangeNegotiable={interim.onChangeNegotiable}
                onClickRemove={interim.onRemove}
              />
            </div>
          ))}
          <div tw="px-5 pt-7 flex flex-col gap-4">
            <Form.RemainingAmount value={remainingAmount} onChange={onChangeRemainingAmount} />
          </div>
        </div>
      );
    case Forms.SpecialTerms:
      return (
        <div id={Forms.SpecialTerms} tw="px-5 py-10">
          <Form.SpecialTerms
            hasSpecialTerms={hasSpecialTerms}
            onChangeHasSpecialTerms={onChangeHasSpecialTerms}
            value={specialTerms}
            onChangeValue={onChangeSpecialTerms}
          />
        </div>
      );

    case Forms.MoveInDate:
      return (
        <div id={Forms.MoveInDate} tw="px-5 py-10">
          <Form.MoveInDate
            date={moveInDate}
            dateType={moveInDateType}
            hasDate={hasMoveInDate}
            onChangeDate={onChangeMoveInDate}
            onChangeDateType={onChangeMoveInDateType}
            onChangeHasDate={onChangeHasMoveInDate}
          />
        </div>
      );
    case Forms.RentArea:
      return (
        <div id={Forms.RentArea} tw="px-5 py-10">
          <Form.RentArea
            hasRentArea={hasRentArea}
            onChangeHasRentArea={onChangeHasRentArea}
            value={rentArea}
            onChangeValue={onChangeRentArea}
          />
        </div>
      );
    case Forms.RentTerm:
      return (
        <div id={Forms.RentTerm} tw="px-5 py-10">
          <Form.RentTerm
            rentTermYear={rentTermYear}
            rentTermMonth={rentTermMonth}
            rentTermNegotiable={rentTermNegotiable}
            onChangeRentTermYear={onChangeRentTermYear}
            onChangeRentTermMonth={onChangeRentTermMonth}
            onChangeRentTermNegotiable={onChangeRentTermNegotiable}
          />
        </div>
      );
    case Forms.JeonsaeLoan:
      return (
        <div id={Forms.JeonsaeLoan} tw="px-5 py-10">
          <Form.JeonsaeLoan
            isJeonsae={buyOrRent === BuyOrRent.Jeonsae}
            value={jeonsaeLoan}
            onChange={onChangeJeonsaeLoan}
          />
        </div>
      );

    case Forms.RentEndDate:
      return (
        <div id={Forms.RentEndDate} tw="px-5 py-10">
          <Form.RentEndDate date={rentEndDate} onChangeDate={onChangeRentEndDate} />
        </div>
      );

    case Forms.Optionals:
      return (
        <div id={Forms.Optionals}>
          <div tw="px-5 py-10">
            <Form.ListingOptions
              verandaExtended={verandaExtended}
              verandaRemodelling={verandaRemodelling}
              onChangeVerandaExtended={onChangeVerandaExtended}
              onChangeVerandaRemodelling={onChangeVerandaRemodelling}
            />
          </div>
          {buyOrRent !== BuyOrRent.Buy && (
            <div>
              <Separator />
              <div tw="px-5 py-10">
                <Form.ExtraOptions
                  extraOptions={extraOptions}
                  onChangeExtraOptions={onChangeExtraOptions}
                  listingOptions={listingOptions}
                />
              </div>
            </div>
          )}
          <Separator />
          <div tw="px-5 py-10">
            <Form.Description value={description} onChangeValue={onChangeDescription} />
          </div>
          <Separator />
          <div tw="px-5 pt-10 pb-7">
            <div tw="flex items-center justify-between">
              <div tw="text-b1 font-bold">사진 등록</div>
              {isPermSettingsSupported && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.Android?.goToAppPermissionSettings?.();
                      window.webkit?.messageHandlers?.goToAppPermissionSettings?.postMessage?.(
                        'goToAppPermissionSettings',
                      );
                    }
                  }}
                >
                  권한 설정 확인
                </Button>
              )}
            </div>
            {isPermSettingsSupported && (
              <div tw="text-info text-gray-700 mt-1">
                카메라 이용을 위해서는 카메라와 미디어 접근권한을 모두 허용해 주세요.
              </div>
            )}
          </div>
          <div tw="px-5 pb-10">
            <div tw="flex justify-between mb-4">
              <div tw="text-b1 leading-none font-bold">매물 사진</div>
              <div tw="text-info text-gray-700 leading-4">- 최대 6장</div>
            </div>
            <Form.Photos urls={listingPhotoUrls} onChange={onChangeListingPhotoUrls} />
          </div>
          <div tw="px-5 pb-10">
            <div tw="flex justify-between mb-4">
              <div tw="text-b1 leading-none font-bold">단지 사진</div>
              <div tw="text-info text-gray-700 leading-4">- 최대 6장</div>
            </div>
            <Form.Photos urls={danjiPhotoUrls} onChange={onChangeDanjiPhotoUrls} />
          </div>
        </div>
      );
    default:
      return null;
  }
}
