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
    handleChangeIsOwner,
    handleChangeOwnerName,
    handleChangeOwnerPhone,
    handleChangeBuyOrRent,
    handleClickNext,
    handleCancelChangeBuyOrRent,
    handleConfirmChangeBuyOrRent,
    handleChangePrice,
    handleChangeMonthlyRentFee,
    handleAddInterim,
    handleChangeContractAmount,
    handleChangeContractAmountNegotiable,
    handleChangeRemainingAmount,
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
      />
      {popup === 'buyOrRentChagne' && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>입력하신 값들이 초기화 됩니다.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleCancelChangeBuyOrRent}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleConfirmChangeBuyOrRent}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
