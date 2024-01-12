import Section from './ui/Section';

import PurposeField from './field/PurposeField';

import InvestAmountField from './field/InvestAmountField';

import useSelectPurpose from './hooks/useSelectPurpose';

import useChangeInvestAmount from './hooks/useChangeInvestAmount';

import useChangeMoveInDate from './hooks/useChangeMoveInDate';

import MoveInDateField from './field/MoveInDateField';

import FIELD_ID from './constants/fieldId';

import forms from './constants/forms';

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
    <Section id={forms.BUY_PURPOSE} tw="gap-4">
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
          id={FIELD_ID.InvestAmount}
          isRender={isRenderInvestAmountField}
          errorMessage={errorMessageInvestAmountPrice}
          price={formattedPrice}
          label={investAmountLabel}
          handleChange={handleChangeInvestAmount}
          handleReset={handleResetInvestAmount}
        />
      </div>
    </Section>
  );
}
