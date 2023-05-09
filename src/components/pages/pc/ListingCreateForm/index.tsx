import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingCreateForm } from '@/components/templates';
import { memo, useEffect, useRef, useState } from 'react';
import useAPI_GetOptionList from '@/apis/listing/getOptionList';
import CoachScrollUp from '@/assets/icons/coach_scroll_up.svg';
import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';
import { motion } from 'framer-motion';
import useListingCreateForm from './useListingCreateForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const {
    dong,
    ho,

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
    hasRentArea,
    handleChangeRentArea,
    handleChangeHasRentArea,

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

    hasMoveInDate,
    handleChangeHasMoveInDate,

    hasSpecialTerms,
    handleChangeHasSpecialTerms,

    handleClickBack,
    openBackPopup,
    nextButtonDisabled,

    isAddInterimButtonDisabled,
  } = useListingCreateForm(depth);

  const { list: listingOptions } = useAPI_GetOptionList();

  const [isCoachVisible, setIsCoachVisible] = useState(false);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const currentForm = forms[forms.length - 1];
    if (currentForm === Forms.BuyOrRent) {
      setIsCoachVisible(true);
    }
  }, [forms]);

  return (
    <Panel width={panelWidth}>
      <ListingCreateForm
        dong={dong ?? ''}
        ho={ho ?? ''}
        isAddInterimButtonDisabled={isAddInterimButtonDisabled}
        nextButtonDisabled={nextButtonDisabled}
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
        hasRentArea={hasRentArea}
        onChangeRentArea={handleChangeRentArea}
        onChangeHasRentArea={handleChangeHasRentArea}
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
        hasMoveInDate={hasMoveInDate}
        onChangeHasMoveInDate={handleChangeHasMoveInDate}
        hasSpecialTerms={hasSpecialTerms}
        onChangeHasSpecialTerms={handleChangeHasSpecialTerms}
      />
      {isCoachVisible && !hasBeenVisible.current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="presentation"
          onClick={() => {
            setIsCoachVisible(false);
            hasBeenVisible.current = true;
          }}
          tw="absolute left-0 top-0 w-full h-full bg-black/60 flex flex-col items-center justify-center"
        >
          <div>
            <div tw="flex items-center justify-center mb-5">
              <motion.div
                animate={{
                  opacity: [0, 1],
                  y: [30, 0],
                  rotate: [-50, 0],
                }}
                transition={{
                  delay: 0.1,
                  duration: 1,
                }}
              >
                <CoachScrollUp />
              </motion.div>
            </div>
            <div tw="text-center font-bold text-white text-b1">
              위로 스크롤하여
              <br />
              이전 항목을 다시 볼 수 있습니다.
            </div>
          </div>
        </motion.div>
      )}
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
