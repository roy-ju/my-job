import { MobileContainer } from '@/components/atoms';
import { SuggestRegionalForm } from '@/components/templates';
import { memo, useCallback, useState } from 'react';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useRouter } from 'next/router';
// import Routes from '@/router/routes';
import useSuggestRegionalForm from './useSuggestRegionalForm';
import RegionForm from './RegionForm';

export default memo(() => {
  const router = useRouter();

  const {
    isRegionListOpen,
    forms,
    nextButtonDisabled,
    handleClickNext,
    handleOpenRegionList,
    handleCloseRegionList,

    bubjungdong,
    handleChangeBubjungdong,

    realestateType,
    handleChangeRealestateType,

    buyOrRent,
    handleChangeBuyOrRent,

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

    remainingAmountDate,
    handleChangeRemainingAmountDate,

    remainingAmountDateType,
    handleChangeRemainingAmountDateType,
    openResetPopup,
    onClosePopup,
    onConfirmPopup,
  } = useSuggestRegionalForm();

  const [openPopup, setOpenPopUp] = useState(false);

  const handleClickBack = useCallback(() => {
    if (forms.length === 1) {
      router.back();
    }

    if (forms.length > 1) {
      setOpenPopUp(true);
    }
  }, [router, forms]);

  return (
    <MobileContainer>
      <SuggestRegionalForm
        onClickBack={handleClickBack}
        forms={forms}
        nextButtonDisabled={nextButtonDisabled}
        onClickNext={handleClickNext}
        onClickOpenRegionList={handleOpenRegionList}
        region={bubjungdong?.name}
        realestateType={realestateType}
        buyOrRent={buyOrRent}
        onChangeBuyOrRent={handleChangeBuyOrRent}
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
        remainingAmountDate={remainingAmountDate}
        onChangeRemainingAmountDate={handleChangeRemainingAmountDate}
        remainingAmountDateType={remainingAmountDateType}
        onChangeRemainingAmountDateType={handleChangeRemainingAmountDateType}
      />
      {isRegionListOpen && (
        <OverlayPresenter>
          <div tw="bg-white w-[90vw] h-[90vh] max-w-[380px] max-h-[600px] rounded-lg shadow">
            <RegionForm
              onClickClose={handleCloseRegionList}
              onSubmit={(item) => {
                handleChangeBubjungdong(item);
                handleCloseRegionList();
              }}
            />
          </div>
        </OverlayPresenter>
      )}
      {openPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>추천받기를 종료하시겠습니까?</Popup.Title>
              <Popup.Body>
                추천받기를 종료하시면 입력하신 내용이 모두 삭제됩니다.
                <br />
                입력한 내용을 확인 또는 수정하시려면 화면을 위로 이동해 주세요.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenPopUp(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={() => router.back()}>추천받기 종료</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {openResetPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.Title>
                거래 종류를 변경하시면 처음부터 다시 입력하셔야 합니다. 거래 종류를 변경하시겠습니까?
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={onClosePopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={onConfirmPopup}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
});
