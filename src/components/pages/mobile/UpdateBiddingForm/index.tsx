import { Loading, MobileContainer } from '@/components/atoms';
import { BiddingForm } from '@/components/templates';
import { memo } from 'react';
import { useRouter } from 'next/router';

import useUpdateBiddingForm from './useUpdateBiddingForm';

export default memo(() => {
  const router = useRouter();

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

    handleClickNext,
  } = useUpdateBiddingForm();

  return (
    <MobileContainer>
      {isLoadingBidding || isLoadingListing ? (
        <div tw="py-20">
          <Loading />
        </div>
      ) : (
        <BiddingForm
          onClickBack={() => router.back()}
          headerTitle="가격제안 수정"
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
    </MobileContainer>
  );
});
