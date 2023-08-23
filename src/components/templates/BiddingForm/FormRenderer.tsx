import { BiddingForm as Form } from '@/components/organisms';
import { useContext, useMemo } from 'react';
import _ from 'lodash';
import { BuyOrRent } from '@/constants/enums';
import { Separator } from '@/components/atoms';
import FormContext from './FormContext';

export default function FormRenderer() {
  const {
    listing,

    type,
    onChangeType,

    price,
    onChangePrice,

    monthlyRentFee,
    onChangeMonthlyRentFee,

    moveInDate,
    onChangeMoveInDate,

    moveInDateType,
    onChangeMoveInDateType,

    etcs,
    onChangeEtcs,

    description,
    onChangeDescription,
  } = useContext(FormContext);

  const formType = useMemo(() => {
    if (listing?.buy_or_rent === BuyOrRent.Buy) return BuyOrRent.Buy;

    if (listing?.buy_or_rent === BuyOrRent.Jeonsae) return BuyOrRent.Jeonsae;

    if (listing?.buy_or_rent === BuyOrRent.Wolsae) return BuyOrRent.Wolsae;

    return null;
  }, [listing]);

  if (!formType) return null;

  return (
    <>
      <div>
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

      {(formType === BuyOrRent.Jeonsae || formType === BuyOrRent.Wolsae) && type === 1 && (
        <div>
          <Separator />
          <Form.MoveInDate
            date={moveInDate}
            dateType={moveInDateType}
            onChangeDate={onChangeMoveInDate}
            onChangeDateType={onChangeMoveInDateType}
          />
        </div>
      )}

      {type === 1 && (
        <div>
          <Separator />
          <Form.Etc
            buyOrRent={listing?.buy_or_rent}
            etcs={etcs}
            description={description}
            onChangeDescription={onChangeDescription}
            onChangeEtcs={onChangeEtcs}
          />
        </div>
      )}
    </>
  );
}
