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

    listing,
    displayAddress,

    type,
    handleChangeType,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    moveInDate,
    handleChangeMoveInDate,

    moveInDateType,
    handleChangeMoveInDateType,

    etcs,
    handleChangeEtcs,

    description,
    handleChangeDescription,

    nextButtonDisabled,
    getBackButtonHandler,

    handleClickNext,
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
          onClickNext={handleClickNext}
          type={type}
          onChangeType={handleChangeType}
          price={price}
          onChangePrice={handleChangePrice}
          monthlyRentFee={monthlyRentFee}
          onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
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
