/* eslint-disable react/no-array-index-key */
import { Separator } from '@/components/atoms';
import { ListingCreateForm as Form } from '@/components/organisms';
import { BuyOrRent } from '@/constants/enums';
import { useContext } from 'react';
import FormContext from './FormContext';

export const Forms = {
  IsOwner: 'isOwner',
  Price: 'price',
  BuyOrRent: 'buyOrRent',
  PaymentSchedules: 'paymentSchedule',
  SpecialTerms: 'specialTerms',
  Optionals: 'optionals',
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
    onChangePrice,
    onChangeMonthlyRentFee,
    // 희망 지급일정
    contractAmount,
    contractAmountNegotiable,
    remainingAmount,
    interims,
    onChangeContractAmount,
    onChangeContractAmountNegotiable,
    onChangeRemainingAmount,
    onClickAddInterim,
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
            monthlyRentFee={monthlyRentFee}
            onChangePrice={onChangePrice}
            onChangeMonthlyRentFee={onChangeMonthlyRentFee}
          />
        </div>
      );
    case Forms.PaymentSchedules:
      return (
        <div id={Forms.PaymentSchedules} tw="py-10">
          <div tw="pb-7 px-5">
            <Form.PaymentSchedule showCalculator={buyOrRent === BuyOrRent.Buy} onClickAddInterim={onClickAddInterim} />
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
              <Form.Schedule />
            </div>
          ))}
          <div tw="px-5 pt-7 flex flex-col gap-4">
            <Form.RemainingAmount value={remainingAmount} onChange={onChangeRemainingAmount} />
            <Form.Schedule />
          </div>
        </div>
      );
    case Forms.SpecialTerms:
      return (
        <div id={Forms.SpecialTerms} tw="px-5 py-10">
          <Form.SpecialTerms />
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
          <div tw="px-5 py-10">
            <Form.AdminFee />
          </div>
          <div tw="px-5 py-10">
            <Form.Description />
          </div>
        </div>
      );
    default:
      return null;
  }
}
