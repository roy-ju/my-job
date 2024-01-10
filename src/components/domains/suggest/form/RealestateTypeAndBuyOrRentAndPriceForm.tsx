import RealestateTypeField from './field/RealestateTypeField';

import BuyOrRentField from './field/BuyOrRentField';

import PriceTypeField from './field/PriceTypeField';

import PriceField from './field/PriceField';

import NegotiableField from './field/NegotiableField';

import useChangeNegotiable from './hooks/useChangeNegotiable';

import useChangePriceTypeField from './hooks/useChangePriceFieldType';

import useSelectBuyOrRent from './hooks/useSelectBuyOrRent';

import useSelectRealestateTypes from './hooks/useSelectRealestateTypes';

import useChangeTradeOrDepositPrice from './hooks/useChangeTradeOrDepositPrice';

import useChangeMonthlyRentFee from './hooks/useChangeMonthlyRentFee';

import FIELD_ID from './constants/fieldId';

import forms from './constants/forms';

export default function RealestateTypeAndBuyOrRentAndPriceForm() {
  const { isRenderRealestateTypeField, realestateTypes, handleClickRealestateType } = useSelectRealestateTypes();

  const { isRenderPriceTypeField, quickSale, handleChangeQuickSale } = useChangePriceTypeField();

  const { isStyleChange, buyOrRent, handleClickBuyOrRent } = useSelectBuyOrRent();

  const { isRenderNegotiableField, negotiable, handleChangeNegotiable } = useChangeNegotiable();

  const {
    formattedPrice: tradeOrDepositPrice,
    isRenderTradeOrDepositPrice,
    tradeOrDepositPriceLabel,
    errorMessageTradeOrDepositPrice,
    handleChangeTradeOrDepositPrice,
    handleResetTradeOrDepositPrice,
  } = useChangeTradeOrDepositPrice();

  const {
    formattedPrice: monthlyRentFee,
    isRenderMonthlyRentFeeField,
    monthlyRentFeeLabel,
    errorMessageMonthlyRentFeePrice,
    handleChangeMonthlyRentFee,
    handleResetMonthlyRentFee,
  } = useChangeMonthlyRentFee();

  return (
    <section id={forms.REALESTATE_AND_BUYORRENT_AND_PRICE} tw="pt-10 pb-10 px-5">
      <RealestateTypeField
        isRender={isRenderRealestateTypeField}
        realestateTypes={realestateTypes}
        handleClick={handleClickRealestateType}
      />
      <BuyOrRentField isStyleChange={isStyleChange} buyOrRent={buyOrRent} handleClick={handleClickBuyOrRent} />
      <PriceTypeField isRender={isRenderPriceTypeField} quickSale={quickSale} handleChange={handleChangeQuickSale} />
      <div id="prices_field" tw="flex flex-col gap-2">
        <PriceField
          key={tradeOrDepositPriceLabel.includes('매매') ? 'tradePrice_field' : 'depositPrice_field'}
          id={FIELD_ID.TradeOrDepositPrice}
          isRender={isRenderTradeOrDepositPrice}
          price={tradeOrDepositPrice}
          label={tradeOrDepositPriceLabel}
          errorMessage={errorMessageTradeOrDepositPrice}
          handleChange={handleChangeTradeOrDepositPrice}
          handleReset={handleResetTradeOrDepositPrice}
        />
        <PriceField
          id={FIELD_ID.MonthlyRentFee}
          isRender={isRenderTradeOrDepositPrice && isRenderMonthlyRentFeeField}
          price={monthlyRentFee}
          label={monthlyRentFeeLabel}
          errorMessage={errorMessageMonthlyRentFeePrice}
          handleChange={handleChangeMonthlyRentFee}
          handleReset={handleResetMonthlyRentFee}
          helperMessage="월세인 경우에만 금액을 입력해주세요."
        />
      </div>
      <NegotiableField
        isRender={isRenderNegotiableField}
        negotiable={negotiable}
        handleChange={handleChangeNegotiable}
      />
    </section>
  );
}
