import PurposeField from './field/PurposeField';

import InvestAmountField from './field/InvestAmountField';

import useSelectPurpose from './hooks/useSelectPurpose';

import useChangeInvestAmount from './hooks/useChangeInvestAmount';

import useChangeMoveInDate from './hooks/useChangeMoveInDate';

import MoveInDateField from './field/MoveInDateField';

export default function BuyPurposeForm() {
  const { isRenderPurposeField, purpose, handleClickBuyPurpose } = useSelectPurpose();

  const {
    isRenderInvestAmountField,
    formattedPrice,
    investAmountLabel,
    errorMessageInvestAmountPrice,
    handleChangeInvestAmount,
    handleResetInvestAmount,
  } = useChangeInvestAmount();

  const { isRenderMoveInDateField, moveInDate, moveInDateType, handleChangeMoveInDate, handlChangeMoveInDateType } =
    useChangeMoveInDate();

  return (
    <section id="buy_purpose" tw="flex flex-col pt-10 pb-10 px-5 gap-4">
      <PurposeField isRender={isRenderPurposeField} purpose={purpose} handleClick={handleClickBuyPurpose} />

      <div>
        <MoveInDateField
          isRender={isRenderMoveInDateField}
          moveInDate={moveInDate}
          moveInDateType={moveInDateType}
          handleChangeMoveInDate={handleChangeMoveInDate}
          handleChangeMoveInDateType={handlChangeMoveInDateType}
        />

        <InvestAmountField
          id="invest_amount_field"
          isRender={isRenderInvestAmountField}
          errorMessage={errorMessageInvestAmountPrice}
          price={formattedPrice}
          label={investAmountLabel}
          handleChange={handleChangeInvestAmount}
          handleReset={handleResetInvestAmount}
        />
      </div>
    </section>
  );
}
