import { Loading, Panel } from '@/components/atoms';
import { BiddingForm } from '@/components/templates';
import { memo } from 'react';
import useUpdateBiddingForm from './useUpdateBiddingForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const {
    isLoadingBidding,
    isLoadingListing,

    nextButtonDisabled,
    listing,
    displayAddress,
    type,
    handleChangeType,
    forms,
    handleClickNext,
    price,
    handleChangePrice,
    monthlyRentFee,
    handleChangeMonthlyRentFee,
    canHaveMoreContractAmount,
    handleChangeCanHaveMoreContractAmount,
    contractAmount,
    handleChangeContractAmount,
    canHaveMoreInterimAmount,
    handleChangeCanHaveMoreInterimAmount,
    interimAmount,
    handleChangeInterimAmount,
    canHaveEarlierRemainingAmountDate,
    handleChangeCanHaveEarlierRemainingAmountDate,
    remainingAmountDate,
    handleChangeRemainingAmountDate,
    remainingAmountDateType,
    handleChangeRemainingAmountDateType,
    canHaveEarlierMoveInDate,
    handleChangeCanHaveEarlierMoveInDate,
    moveInDate,
    handleChangeMoveInDate,
    moveInDateType,
    handleChangeMoveInDateType,
    etcs,
    handleChangeEtcs,
    description,
    handleChangeDescription,
    getBackButtonHandler,
  } = useUpdateBiddingForm(depth);

  return (
    <Panel width={panelWidth}>
      {isLoadingBidding || isLoadingListing ? (
        <div tw="py-20">
          <Loading />
        </div>
      ) : (
        <BiddingForm
          headerTitle="가격제안 수정"
          onClickBack={getBackButtonHandler()}
          nextButtonDisabled={nextButtonDisabled}
          listing={listing}
          displayAddress={displayAddress}
          forms={forms}
          onClickNext={handleClickNext}
          type={type}
          onChangeType={handleChangeType}
          price={price}
          onChangePrice={handleChangePrice}
          monthlyRentFee={monthlyRentFee}
          onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
          canHaveMoreContractAmount={canHaveMoreContractAmount}
          onChangeCanHaveMoreContractAmount={handleChangeCanHaveMoreContractAmount}
          contractAmount={contractAmount}
          onChangeContractAmount={handleChangeContractAmount}
          canHaveMoreInterimAmount={canHaveMoreInterimAmount}
          onChangeCanHaveMoreInterimAmount={handleChangeCanHaveMoreInterimAmount}
          interimAmount={interimAmount}
          onChangeInterimAmount={handleChangeInterimAmount}
          canHaveEarilerRemainingAmountDate={canHaveEarlierRemainingAmountDate}
          onChangeCanHaveEarilerRemainingAmountDate={handleChangeCanHaveEarlierRemainingAmountDate}
          remainingAmountDate={remainingAmountDate}
          onChangeRemainingAmountDate={handleChangeRemainingAmountDate}
          remainingAmountDateType={remainingAmountDateType}
          onChangeRemainingAmountDateType={handleChangeRemainingAmountDateType}
          canHaveEarilerMoveInDate={canHaveEarlierMoveInDate}
          onChangeCanHaveEarilerMoveInDate={handleChangeCanHaveEarlierMoveInDate}
          moveInDate={moveInDate}
          onChangeMoveInDate={handleChangeMoveInDate}
          moveInDateType={moveInDateType}
          onChangeMoveInDateType={handleChangeMoveInDateType}
          etcs={etcs}
          onChangeEtcs={handleChangeEtcs}
          description={description}
          onChangeDescription={handleChangeDescription}
        />
      )}
    </Panel>
  );
});
