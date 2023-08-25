/* eslint-disable react-hooks/exhaustive-deps */
import { DanjiRecommendation as DanjiRecommendationTemplate } from '@/components/templates';
import { MobileContainer } from '@/components/atoms';
import { DanjiList } from '@/components/organisms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { useRouter } from 'next/router';
import { memo, useCallback, useState } from 'react';
import useDanjiRecommendationForm from './useDanjiRecommendation';

export default memo(() => {
  const {
    forms,
    isDanjiListOpen,
    nextButtonDisabled,

    danji,
    danjiID,
    handleChangeDanjiID,

    buyOrRent,
    handleChangeBuyOrRent,

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

    openResetPopup,

    handleOpenDanjiList,
    handleCloseDanjiList,

    handleClickNext,
    onClosePopup,
    onConfirmPopup,

    danjiRealPricesPyoungList,

    pyoungInputValue,
    handleChangePyoungInputValue,
    handleClickPyoungDeleteIcon,
    handleClickPyoungAddIcon,
    handleClickPyoungButton,
    handleClickPyoungCloseButton,

    emptyTextFields,
  } = useDanjiRecommendationForm();

  const router = useRouter();

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
      <DanjiRecommendationTemplate
        forms={forms}
        nextButtonDisabled={nextButtonDisabled}
        onClickNext={handleClickNext}
        onClickBack={handleClickBack}
        danji={danji}
        danjiID={Number(danjiID) ?? undefined}
        buyOrRent={buyOrRent}
        onChangeBuyOrRent={handleChangeBuyOrRent}
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
        onClickOpenDanjiList={handleOpenDanjiList}
        emptyTextFields={emptyTextFields}
      />
      {isDanjiListOpen && (
        <OverlayPresenter>
          <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
            <DanjiList tw="h-full">
              <DanjiList.Header onClickClose={handleCloseDanjiList} />
              <DanjiList.AddressSearchForm
                onSubmit={(id) => {
                  handleChangeDanjiID(String(id));
                  handleCloseDanjiList();
                }}
              />
            </DanjiList>
          </div>
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
    </MobileContainer>
  );
});
