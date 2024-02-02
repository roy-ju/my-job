import { memo } from 'react';

import { useRouter } from 'next/router';

import { MobAuthRequired, MobileContainer } from '@/components/atoms';

import { BiddingForm } from '@/components/templates';

import useBiddingForm from './useBiddingForm';

export default memo(() => {
  const router = useRouter();

  const {
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
  } = useBiddingForm();

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        <BiddingForm
          listing={listing}
          displayAddress={displayAddress}
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
          nextButtonDisabled={nextButtonDisabled}
          onClickNext={handleClickNext}
          onClickBack={() => router.back()}
        />
      </MobileContainer>
    </MobAuthRequired>
  );
});
