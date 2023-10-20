import { MobileContainer } from '@/components/atoms';
import { DanjiRecommendationUpdate as DanjiRecommendationUpdateTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { BuyOrRent } from '@/constants/enums';
import useDanjiRecommendationUpdate from './useDanjiRecommendationUpdate';

export default memo(() => {
  const router = useRouter();

  const {
    nextButtonDisabled,
    handleSubmitFinal,
    targetText,
    buyOrRentText,

    danji,
    danjiID,

    buyOrRent,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    quickSale,
    handleChangeQuickSale,

    investAmount,
    handleChangeInvestAmount,

    negotiable,
    handleChangeNegotiable,

    pyoungList,
    handleChangePyoungList,

    purpose,
    handleChangePurpose,

    moveInDate,
    moveInDateType,
    handleChangeMoveInDate,
    handleChangeMoveInDateType,

    description,
    handleChangeDescription,

    interviewAvailabletimes,
    handleChangeInterviewAvailabletimes,

    danjiRealPricesPyoungList,

    pyoungInputValue,
    handleChangePyoungInputValue,
    handleClickPyoungDeleteIcon,
    handleClickPyoungAddIcon,
    handleClickPyoungButton,
    handleClickPyoungCloseButton,

    emptyTextFields,

    isEntryDanji,
  } = useDanjiRecommendationUpdate();

  return (
    <MobileContainer>
      <DanjiRecommendationUpdateTemplate
        onClickBack={() => router.back()}
        targetText={targetText}
        buyOrRentText={buyOrRentText}
        nextButtonDisabled={nextButtonDisabled}
        onSubmitFinal={handleSubmitFinal}
        danji={danji}
        danjiID={Number(danjiID) ?? undefined}
        buyOrRent={Number(buyOrRent) || BuyOrRent.Jeonsae}
        price={price}
        onChangePrice={handleChangePrice}
        monthlyRentFee={monthlyRentFee}
        onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
        quickSale={quickSale}
        onChangeQuickSale={handleChangeQuickSale}
        investAmount={investAmount}
        onChangeInvestAmount={handleChangeInvestAmount}
        negotiable={negotiable}
        onChangeNegotiable={handleChangeNegotiable}
        pyoungList={pyoungList}
        onChangePyoungList={handleChangePyoungList}
        purpose={purpose}
        onChangePurpose={handleChangePurpose}
        moveInDate={moveInDate}
        onChangeMoveInDate={handleChangeMoveInDate}
        moveInDateType={moveInDateType}
        onChangeMoveInDateType={handleChangeMoveInDateType}
        description={description}
        onChangeDescription={handleChangeDescription}
        pyoungInputValue={pyoungInputValue}
        onChangePyoungInputValue={handleChangePyoungInputValue}
        interviewAvailabletimes={interviewAvailabletimes}
        onChangeInterviewAvailabletimes={handleChangeInterviewAvailabletimes}
        danjiRealPricesPyoungList={danjiRealPricesPyoungList}
        onClickPyoungDeleteIcon={handleClickPyoungDeleteIcon}
        onClickPyoungAddIcon={handleClickPyoungAddIcon}
        onClickPyoungButton={handleClickPyoungButton}
        onClickPyoungCloseButton={handleClickPyoungCloseButton}
        emptyTextFields={emptyTextFields}
        isEntryDanji={isEntryDanji}
      />
    </MobileContainer>
  );
});
