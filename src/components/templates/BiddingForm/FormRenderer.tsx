import { BiddingForm as Form } from '@/components/organisms';
import { useContext, useMemo } from 'react';
import _ from 'lodash';
import FormContext from './FormContext';

export const Forms = {
  Price: 'price',
  ContractAmount: 'contractAmount',
  InterimAmount: 'interimAmount',
  RemainingAmount: 'remainingAmount',
  MoveInDate: 'moveInDate',
  Etc: 'etc',
};

interface Props {
  form: string;
}

export default function FormRenderer({ form }: Props) {
  const {
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
  } = useContext(FormContext);

  const totalInterimAmount = useMemo(
    () =>
      _.sum([listing?.interim_amount1, listing?.interim_amount2, listing?.interim_amount3]?.map((item) => item ?? 0)),
    [listing?.interim_amount1, listing?.interim_amount2, listing?.interim_amount3],
  );

  switch (form) {
    case Forms.Price:
      return (
        <div id={Forms.Price}>
          <Form.Price
            listingMonthlyRentFee={listing?.monthly_rent_fee}
            listingPrice={listing?.trade_price || listing?.deposit}
            buyOrRent={listing?.buy_or_rent}
            tabValue={type}
            onChangeTabValue={onChangeType}
            price={price}
            monthlyRentFee={monthlyRentFee}
            onChangePrice={onChangePrice}
            onChangeMonthlyRentFee={onChangeMonthlyRentFee}
          />
        </div>
      );
    case Forms.ContractAmount:
      return (
        <div id={Forms.ContractAmount}>
          <Form.ContractAmount
            listingPrice={listing?.trade_price || listing?.deposit}
            listingContractAmount={listing?.contract_amount}
            value={canHaveMoreContractAmount}
            onChange={onChangeCanHaveMoreContractAmount}
            amount={contractAmount}
            onChangeAmount={onChangeContractAmount}
          />
        </div>
      );
    case Forms.InterimAmount:
      return (
        <div id={Forms.InterimAmount}>
          <Form.InterimAmount
            // listingPrice={listing?.trade_price || listing?.deposit}
            listingInterimAmount={totalInterimAmount}
            value={canHaveMoreInterimAmount}
            onChange={onChangeCanHaveMoreInterimAmount}
            amount={interimAmount}
            onChangeAmount={onChangeInterimAmount}
          />
        </div>
      );
    case Forms.RemainingAmount:
      return (
        <div id={Forms.RemainingAmount}>
          <Form.RemainingAmount
            listingRemainingAmountDate={listing?.remaining_amount_payment_time}
            value={canHaveEarilerRemainingAmountDate}
            onChange={onChangeCanHaveEarilerRemainingAmountDate}
            date={remainingAmountDate}
            dateType={remainingAmountDateType}
            onChangeDate={onChangeRemainingAmountDate}
            onChangeDateType={onChangeRemainingAmountDateType}
          />
        </div>
      );
    case Forms.MoveInDate:
      return (
        <div id={Forms.MoveInDate}>
          <Form.MoveInDate
            value={canHaveEarilerMoveInDate}
            onChange={onChangeCanHaveEarilerMoveInDate}
            date={moveInDate}
            dateType={moveInDateType}
            onChangeDate={onChangeMoveInDate}
            onChangeDateType={onChangeMoveInDateType}
          />
        </div>
      );
    case Forms.Etc:
      return (
        <div id={Forms.Etc}>
          <Form.Etc
            buyOrRent={listing?.buy_or_rent}
            etcs={etcs}
            description={description}
            onChangeDescription={onChangeDescription}
            onChangeEtcs={onChangeEtcs}
          />
        </div>
      );

    default:
      return null;
  }
}
