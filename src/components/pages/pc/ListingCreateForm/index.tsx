import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingCreateForm } from '@/components/templates';
import { memo } from 'react';
import useAPI_GetOptionList from '@/apis/listing/getOptionList';
import useListingCreateForm from './useListingCreateForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const {
    addressLine1,
    addressLine2,
    popup,
    errPopup,
    forms,
    isOwner,
    ownerName,
    ownerPhone,
    buyOrRent,
    price,
    monthlyRentFee,
    contractAmount,
    contractAmountNegotiable,
    remainingAmount,
    interims,
    debtSuccessionDeposit,
    debtSuccessionMiscs,
    collaterals,
    specialTerms,
    moveInDate,
    moveInDateType,
    handleChangeIsOwner,
    handleChangeOwnerName,
    handleChangeOwnerPhone,
    handleChangeBuyOrRent,
    handleClickNext,
    closePopup,
    closeErrPopup,
    handleConfirmChangeBuyOrRent,
    handleChangePrice,
    handleChangeMonthlyRentFee,
    handleAddInterim,
    handleChangeContractAmount,
    handleChangeContractAmountNegotiable,
    handleChangeRemainingAmount,
    handleChangeDebtSuccessionDeposit,
    handleAddDebtSuccessionMisc,
    handleChangeSpecialTerms,
    handleAddCollaterals,
    handleChangeMoveInDateType,
    handleChangeMoveInDate,

    remainingAmountDate,
    remainingAmountDateType,
    handleChangeRemainingAmountDate,
    handleChangeRemainingAmountDateType,

    rentArea,
    handleChangeRentArea,

    verandaExtended,
    verandaRemodelling,
    handleChangeVerandaExtended,
    handleChangeVerandaRemodelling,

    extraOptions,
    handleChangeExtraOptions,

    rentTermMonth,
    rentTermYear,
    rentTermNegotiable,
    handleChangeRentTermMonth,
    handleChangeRentTermYear,
    handleChangeRentTermNegotiable,

    quickSale,
    handleChangeQuickSale,

    jeonsaeLoan,
    handleChangeJeonsaeLoan,

    adminFee,
    handleChangeAdminFee,

    listingPhotoUrls,
    handleChangeListingPhotoUrls,

    danjiPhotoUrls,
    handleChangeDanjiPhotoUrls,

    description,
    handleChangeDescription,

    rentEndDate,
    handleChangeRentEndDate,

    handleClickBack,
    openBackPopup,
  } = useListingCreateForm(depth);

  const { list: listingOptions } = useAPI_GetOptionList();

  return (
    <Panel width={panelWidth}>
      <ListingCreateForm
        onClickBack={openBackPopup}
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        forms={forms}
        isOwner={isOwner}
        ownerName={ownerName}
        ownerPhone={ownerPhone}
        buyOrRent={buyOrRent}
        price={price}
        monthlyRentFee={monthlyRentFee}
        contractAmount={contractAmount}
        contractAmountNegotiable={contractAmountNegotiable}
        remainingAmount={remainingAmount}
        interims={interims}
        debtSuccessionDeposit={debtSuccessionDeposit}
        debtSuccessionMiscs={debtSuccessionMiscs}
        collaterals={collaterals}
        specialTerms={specialTerms}
        verandaExtended={verandaExtended}
        verandaRemodelling={verandaRemodelling}
        onChangeVerandaExtended={handleChangeVerandaExtended}
        onChangeVerandaRemodelling={handleChangeVerandaRemodelling}
        extraOptions={extraOptions}
        onChangeExtraOptions={handleChangeExtraOptions}
        listingOptions={listingOptions}
        moveInDate={moveInDate}
        moveInDateType={moveInDateType}
        onClickNext={handleClickNext}
        onChangeIsOwner={handleChangeIsOwner}
        onChangeOwnerName={handleChangeOwnerName}
        onChangeOwnerPhone={handleChangeOwnerPhone}
        onChangeBuyOrRent={handleChangeBuyOrRent}
        onChangePrice={handleChangePrice}
        onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
        onClickAddInterim={handleAddInterim}
        onChangeContractAmount={handleChangeContractAmount}
        onChangeContractAmountNegotiable={handleChangeContractAmountNegotiable}
        onChangeRemainingAmount={handleChangeRemainingAmount}
        onChangeDebtSuccessionDeposit={handleChangeDebtSuccessionDeposit}
        onClickAddDebtSuccessionMisc={handleAddDebtSuccessionMisc}
        onChangeSpecialTerms={handleChangeSpecialTerms}
        onClickAddCollateral={handleAddCollaterals}
        onChangeMoveInDate={handleChangeMoveInDate}
        onChangeMoveInDateType={handleChangeMoveInDateType}
        remainingAmountDate={remainingAmountDate}
        remainingAmountDateType={remainingAmountDateType}
        onChangeRemainingAmountDate={handleChangeRemainingAmountDate}
        onChangeRemainingAmountDateType={handleChangeRemainingAmountDateType}
        rentArea={rentArea}
        onChangeRentArea={handleChangeRentArea}
        rentTermYear={rentTermYear}
        rentTermMonth={rentTermMonth}
        rentTermNegotiable={rentTermNegotiable}
        onChangeRentTermYear={handleChangeRentTermYear}
        onChangeRentTermMonth={handleChangeRentTermMonth}
        onChangeRentTermNegotiable={handleChangeRentTermNegotiable}
        quickSale={quickSale}
        onChangeQuickSale={handleChangeQuickSale}
        jeonsaeLoan={jeonsaeLoan}
        onChangeJeonsaeLoan={handleChangeJeonsaeLoan}
        adminFee={adminFee}
        onChangeAdminFee={handleChangeAdminFee}
        listingPhotoUrls={listingPhotoUrls}
        onChangeListingPhotoUrls={handleChangeListingPhotoUrls}
        danjiPhotoUrls={danjiPhotoUrls}
        onChangeDanjiPhotoUrls={handleChangeDanjiPhotoUrls}
        description={description}
        onChangeDescription={handleChangeDescription}
        rentEndDate={rentEndDate}
        onChangeRentEndDate={handleChangeRentEndDate}
      />
      {popup === 'back' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>
                정말 뒤로 돌아가시겠습니까?
                <br />
                입력하신 정보가 저장되지 않습니다.
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={closePopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleClickBack}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {popup === 'buyOrRentChagne' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>입력하신 값들이 초기화 됩니다.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={closePopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleConfirmChangeBuyOrRent}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {errPopup !== '' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>{errPopup}</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={closeErrPopup}>닫기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
