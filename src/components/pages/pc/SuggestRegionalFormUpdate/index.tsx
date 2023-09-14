import { Panel, Loading } from '@/components/atoms';
import { memo } from 'react';
import { SuggestRegionalFormUpdate as SuggestRegionalFormUpdateTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useRouter as useNextRouter } from 'next/router';
import useSuggestRegionalFormUpdate from './useSuggestRegionalFormUpdate';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const handleClickBack = () => {
    nextRouter.push(router.query.back as string);
  };

  const {
    targetText,
    buyOrRentText,
    isLoading,

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
  } = useSuggestRegionalFormUpdate(depth);

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
      <SuggestRegionalFormUpdateTemplate
        onClickBack={handleClickBack}
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
    </Panel>
  );
});
