import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingCreateForm } from '@/components/templates';
import { memo } from 'react';
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
    beforeOrAfter,
    handleChangeIsOwner,
    handleChangeOwnerName,
    handleChangeOwnerPhone,
    handleChangeBuyOrRent,
    handleClickNext,
    closePopup,
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
    handleChangeBeforeOrAfter,
    handleChangeMoveInDate,

    remainingAmountDate,
    remainingAmountBeforeOrAfter,
    handleChangeRemainingAmountDate,
    handleChangeRemainingAmountBeforeOrAfter,

    rentArea,
    handleChangeRentArea,

    rentTermMonth,
    rentTermYear,
    rentTermNegotiable,
    handleChangeRentTermMonth,
    handleChangeRentTermYear,
    handleChangeRentTermNegotiable,
  } = useListingCreateForm(depth);

  return (
    <Panel width={panelWidth}>
      <ListingCreateForm
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
        moveInDate={moveInDate}
        beforeOrAfter={beforeOrAfter}
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
        onChangeBeforeOrAfter={handleChangeBeforeOrAfter}
        remainingAmountDate={remainingAmountDate}
        remainingAmountBeforeOrAfter={remainingAmountBeforeOrAfter}
        onChangeRemainingAmountDate={handleChangeRemainingAmountDate}
        onChangeRemainingAmountBeforeOrAfter={handleChangeRemainingAmountBeforeOrAfter}
        rentArea={rentArea}
        onChangeRentArea={handleChangeRentArea}
        rentTermYear={rentTermYear}
        rentTermMonth={rentTermMonth}
        rentTermNegotiable={rentTermNegotiable}
        onChangeRentTermYear={handleChangeRentTermYear}
        onChangeRentTermMonth={handleChangeRentTermMonth}
        onChangeRentTermNegotiable={handleChangeRentTermNegotiable}
      />
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
    </Panel>
  );
});
