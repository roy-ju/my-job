/* eslint-disable react/no-array-index-key */
import { Separator } from '@/components/atoms';
import { ListingCreateForm as Form } from '@/components/organisms';
import { BuyOrRent } from '@/constants/enums';
import { useContext } from 'react';
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
};

interface Props {
  form: string;
}

export default function FormRenderer({ form }: Props) {
  const {
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
    remainingAmountDate,
    remainingAmountDateType,
    interims,
    onChangeContractAmount,
    onChangeContractAmountNegotiable,
    onChangeRemainingAmount,
    onClickAddInterim,
    onChangeRemainingAmountDate,
    onChangeRemainingAmountDateType,
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
    onChangeMoveInDate,
    onChangeMoveInDateType,
    specialTerms,
    onChangeSpecialTerms,
    // 임대할 부분
    rentArea,
    onChangeRentArea,

    rentTermMonth,
    rentTermYear,
    rentTermNegotiable,
    onChangeRentTermMonth,
    onChangeRentTermYear,
    onChangeRentTermNegotiable,

    jeonsaeLoan,
    onChangeJeonsaeLoan,

    adminFee,
    onChangeAdminFee,

    listingPhotoUrls,
    onChangeListingPhotoUrls,
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
          <div tw="px-5 py-10">
            <Form.DebtSuccession
              deposit={debtSuccessionDeposit}
              onChangeDeposit={onChangeDebtSuccessionDeposit}
              onClickAdd={onClickAddDebtSuccessionMisc}
            />
          </div>
          {debtSuccessionMiscs?.map((debtSuccession) => (
            <div key={debtSuccession.key} tw="px-5 py-7 border-t border-t-gray-300">
              <Form.DebtSuccession.Miscellaneous
                name={debtSuccession.name}
                price={debtSuccession.price}
                onChangeName={debtSuccession.onChangeName}
                onChangePrice={debtSuccession.onChangePrice}
                onClickRemove={debtSuccession.onRemove}
              />
            </div>
          ))}
        </div>
      );

    case Forms.Collaterals:
      return (
        <div id={Forms.Collaterals}>
          <div tw="px-5 py-10">
            <Form.Collateral onClickAdd={onClickAddCollateral} />
          </div>
          {collaterals?.map((collateral) => (
            <div key={collateral.key} tw="px-4 pb-10">
              <Form.Collateral.Item
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
          {interims?.map((interim) => (
            <div key={interim.key} tw="px-5 py-7 flex flex-col gap-4 border-b border-b-gray-300">
              <Form.InterimAmount
                price={interim.price}
                negotiable={interim.negotiable}
                onChangePrice={interim.onChangePrice}
                onChangeNegotiable={interim.onChangeNegotiable}
                onClickRemove={interim.onRemove}
              />
              <Form.Schedule
                date={interim.date}
                dateType={interim.dateType}
                onChangeDate={interim.onChangeDate}
                onChangeDateType={interim.onChangeDateType}
              />
            </div>
          ))}
          <div tw="px-5 pt-7 flex flex-col gap-4">
            <Form.RemainingAmount value={remainingAmount} onChange={onChangeRemainingAmount} />
            <Form.Schedule
              date={remainingAmountDate}
              dateType={remainingAmountDateType}
              onChangeDate={onChangeRemainingAmountDate}
              onChangeDateType={onChangeRemainingAmountDateType}
            />
          </div>
        </div>
      );
    case Forms.SpecialTerms:
      return (
        <div id={Forms.SpecialTerms} tw="px-5 py-10">
          <Form.SpecialTerms value={specialTerms} onChangeValue={onChangeSpecialTerms} />
        </div>
      );

    case Forms.MoveInDate:
      return (
        <div id={Forms.MoveInDate} tw="px-5 py-10">
          <Form.MoveInDate
            date={moveInDate}
            dateType={moveInDateType}
            onChangeDate={onChangeMoveInDate}
            onChangeDateType={onChangeMoveInDateType}
          />
        </div>
      );
    case Forms.RentArea:
      return (
        <div id={Forms.RentArea} tw="px-5 py-10">
          <Form.RentArea value={rentArea} onChangeValue={onChangeRentArea} />
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

    case Forms.Optionals:
      return (
        <div id={Forms.Optionals}>
          <div tw="px-5 py-10">
            <Form.ListingOptions />
          </div>
          <Separator />
          <div tw="px-5 py-10">
            <Form.ExtraOptions />
          </div>
          <Separator />
          <div tw="px-5 py-10">
            <Form.AdminFee value={adminFee} onChange={onChangeAdminFee} />
          </div>
          <Separator />
          <div tw="px-5 py-10">
            <Form.Description />
          </div>
          <Separator />
          <div tw="px-5 py-10">
            <div tw="flex justify-between mb-4">
              <div tw="text-b1 leading-none font-bold">매물 사진</div>
              <div tw="text-info text-gray-700 leading-4">- 최대 6장</div>
            </div>
            <Form.Photos urls={listingPhotoUrls} onChange={onChangeListingPhotoUrls} />
          </div>
          <Separator />
          <div tw="px-5 py-10">
            <div tw="flex justify-between mb-4">
              <div tw="text-b1 leading-none font-bold">단지 사진</div>
              <div tw="text-info text-gray-700 leading-4">- 최대 6장</div>
            </div>
            <Form.Photos />
          </div>
        </div>
      );
    default:
      return null;
  }
}
