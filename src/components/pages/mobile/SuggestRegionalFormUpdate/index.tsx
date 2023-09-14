import { MobileContainer } from '@/components/atoms';
import { SuggestRegionalFormUpdate as SuggestRegionalFormUpdateTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo } from 'react';
import useSuggestRegionalFormUpdate from './useSuggestRegionalFormUpdate';

export default memo(() => {
  const router = useRouter();

  const {
    targetText,
    buyOrRentText,

    nextButtonDisabled,

    realestateType,
    handleChangeRealestateType,

    buyOrRent,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    investAmount,
    handleChangeInvestAmount,

    negotiable,
    handleChangeNegotiable,

    minArea,
    handleChangeMinArea,

    maxArea,
    handleChangeMaxArea,

    purpose,
    handleChangePurpose,

    description,
    handleChangeDescription,

    moveInDate,
    handleChangeMoveInDate,

    moveInDateType,
    handleChangeMoveInDateType,

    emptyTextFields,

    handleSubmitFinal,
  } = useSuggestRegionalFormUpdate();

  return (
    <MobileContainer>
      <SuggestRegionalFormUpdateTemplate
        onClickBack={() => router.back()}
        targetText={targetText}
        buyOrRentText={buyOrRentText}
        nextButtonDisabled={nextButtonDisabled}
        realestateType={realestateType}
        buyOrRent={buyOrRent}
        onChangeRealestateType={handleChangeRealestateType}
        price={price}
        onChangePrice={handleChangePrice}
        investAmount={investAmount}
        onChangeInvestAmount={handleChangeInvestAmount}
        monthlyRentFee={monthlyRentFee}
        onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
        negotiable={negotiable}
        onChangeNegotiable={handleChangeNegotiable}
        minArea={minArea}
        onChangeMinArea={handleChangeMinArea}
        maxArea={maxArea}
        onChangeMaxArea={handleChangeMaxArea}
        purpose={purpose}
        onChangePurpose={handleChangePurpose}
        description={description}
        onChangeDescription={handleChangeDescription}
        moveInDate={moveInDate}
        onChangeMoveInDate={handleChangeMoveInDate}
        moveInDateType={moveInDateType}
        onChangeMoveInDateType={handleChangeMoveInDateType}
        emptyTextFields={emptyTextFields}
        onSubmitFinal={handleSubmitFinal}
      />
    </MobileContainer>
  );
});
