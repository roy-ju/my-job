import { Panel, Loading } from '@/components/atoms';
import { memo } from 'react';
import { DanjiRecommendationUpdate as DanjiRecommendationUpdateTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import { BuyOrRent } from '@/constants/enums';
import useDanjiRecommendationFormUpdate from './useDanjiRecommendationUpdate';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const {
    nextButtonDisabled,
    handleSubmitFinal,
    isLoading,
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

    danjiRealPricesPyoungList,

    pyoungInputValue,
    handleChangePyoungInputValue,
    handleClickPyoungDeleteIcon,
    handleClickPyoungAddIcon,
    handleClickPyoungButton,
    handleClickPyoungCloseButton,

    emptyTextFields,

    isEntryDanji,
  } = useDanjiRecommendationFormUpdate(depth);

  const handleClickBack = () => {
    nextRouter.push(router.query.back as string);
  };

  if (isLoading) {
    return (
      <Panel width={panelWidth}>
        <div tw="py-20">
          <Loading />
        </div>
      </Panel>
    );
  }

  return (
    <Panel width={panelWidth}>
      <DanjiRecommendationUpdateTemplate
        targetText={targetText}
        buyOrRentText={buyOrRentText}
        nextButtonDisabled={nextButtonDisabled}
        onSubmitFinal={handleSubmitFinal}
        onClickBack={handleClickBack}
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
        danjiRealPricesPyoungList={danjiRealPricesPyoungList}
        onClickPyoungDeleteIcon={handleClickPyoungDeleteIcon}
        onClickPyoungAddIcon={handleClickPyoungAddIcon}
        onClickPyoungButton={handleClickPyoungButton}
        onClickPyoungCloseButton={handleClickPyoungCloseButton}
        emptyTextFields={emptyTextFields}
        isEntryDanji={isEntryDanji}
      />
    </Panel>
  );
});
