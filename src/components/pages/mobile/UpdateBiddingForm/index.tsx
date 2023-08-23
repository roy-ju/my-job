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
    handleCancelBidding,
    handleClickNext,

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
