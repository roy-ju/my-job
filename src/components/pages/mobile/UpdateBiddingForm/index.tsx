import { Loading, MobileContainer } from '@/components/atoms';
import { BiddingForm } from '@/components/templates';
import { memo } from 'react';
import { useRouter } from 'next/router';
import { OverlayPresenter, Popup } from '@/components/molecules';
import useUpdateBiddingForm from './useUpdateBiddingForm';

export default memo(() => {
  const router = useRouter();

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
    handleCancelBidding,
    popup,
    setPopup,
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
          onClickCancelBidding={() => setPopup('cancelBidding')}
        />
      )}
      {popup === 'cancelBidding' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-10">
              <Popup.Title>제안을 취소하시겠습니까?</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setPopup('none')}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleCancelBidding}>제안 취소하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
