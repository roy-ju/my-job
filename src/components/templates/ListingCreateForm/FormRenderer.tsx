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
  } = useContext(FormContext);

  switch (form) {
    case Forms.IsOwner:
      return (
        <>
          <div tw="px-5 pt-10 pb-5">
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
        </>
      );
    case Forms.BuyOrRent:
      return (
        <div tw="px-5 py-10">
          <Form.BuyOrRent value={buyOrRent} onChange={onChangeBuyOrRent} />
        </div>
      );
    case Forms.Price:
      return (
        <div tw="px-5 py-10">
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
        <div tw="py-10">
          <div tw="pb-7 px-5">
            <Form.PaymentSchedule showCalculator={buyOrRent === BuyOrRent.Buy} />
          </div>
          <div tw="px-5 pb-7 border-b border-b-gray-300">
            <Form.ContractAmount />
          </div>
          <div tw="px-5 py-7 flex flex-col gap-4 border-b border-b-gray-300">
            <Form.InterimAmount />
            <Form.Schedule />
          </div>
          <div tw="px-5 pt-7 flex flex-col gap-4">
            <Form.RemainingAmount />
            <Form.Schedule />
          </div>
        </div>
      );
    case Forms.SpecialTerms:
      return (
        <div tw="px-5 py-10">
          <Form.SpecialTerms />
        </div>
      );
    default:
      return null;
  }
}
