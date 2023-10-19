/* eslint-disable react-hooks/exhaustive-deps */

import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { DanjiRecommendation as DanjiRecommendationTemplate } from '@/components/templates';
import React from 'react';
import { DanjiList } from '@/components/organisms';
import useDanjiRecommendationForm from './useDanjiRecommendation';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default function DanjiRecommendation({ depth, panelWidth }: Props) {
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

    interviewAvailabletimes,
    handleChangeInterviewAvailabletimes,

    openResetPopup,

    handleOpenDanjiList,
    handleCloseDanjiList,

    handleClickNext,
    handleClickBack,
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

    isEntryDanji,
  } = useDanjiRecommendationForm(depth);

  return (
    <Panel width={panelWidth}>
      <DanjiRecommendationTemplate
        forms={forms}
        nextButtonDisabled={nextButtonDisabled}
        onClickNext={handleClickNext}
        onClickBack={handleClickBack()}
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
        interviewAvailabletimes={interviewAvailabletimes}
        onChangeInterviewAvailabletimes={handleChangeInterviewAvailabletimes}
        danjiRealPricesPyoungList={danjiRealPricesPyoungList}
        onClickPyoungDeleteIcon={handleClickPyoungDeleteIcon}
        onClickPyoungAddIcon={handleClickPyoungAddIcon}
        onClickPyoungButton={handleClickPyoungButton}
        onClickPyoungCloseButton={handleClickPyoungCloseButton}
        onClickOpenDanjiList={handleOpenDanjiList}
        emptyTextFields={emptyTextFields}
        isEntryDanji={isEntryDanji}
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
    </Panel>
  );
}
