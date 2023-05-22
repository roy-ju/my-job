import { BiddingForm } from '@/components/templates';
import { memo } from 'react';
import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { useRouter } from 'next/router';
import useBiddingForm from './useBiddingForm';

export default memo(() => {
  const router = useRouter();

  const {
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
    moveInDate,
    handleChangeMoveInDate,
    moveInDateType,
    handleChangeMoveInDateType,
    etcs,
    handleChangeEtcs,
    description,
    handleChangeDescription,
  } = useBiddingForm();

  return (
    <MobAuthRequired ciRequired>
      <MobileContainer>
        <BiddingForm
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
          moveInDate={moveInDate}
          onChangeMoveInDate={handleChangeMoveInDate}
          moveInDateType={moveInDateType}
          onChangeMoveInDateType={handleChangeMoveInDateType}
          etcs={etcs}
          onChangeEtcs={handleChangeEtcs}
          description={description}
          onChangeDescription={handleChangeDescription}
          onClickBack={() => router.back()}
        />
      </MobileContainer>
    </MobAuthRequired>
  );
});
