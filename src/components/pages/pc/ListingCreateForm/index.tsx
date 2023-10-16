import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { ListingCreateForm } from '@/components/templates';
import { memo, useEffect, useRef, useState } from 'react';
import useAPI_GetOptionList from '@/apis/listing/getOptionList';
import CoachScrollUp from '@/assets/icons/coach_scroll_up.svg';
import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';
import { motion } from 'framer-motion';
import { useRouter } from '@/hooks/utils';
import useListingCreateForm from './useListingCreateForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const {
    // isAddInterimButtonDisabled,
    isAddCollateralDisabled,
    isAddDebtSuccessionDisabled,

    nextButtonDisabled,
    handleClickNext,
    handleClickBack,

    forms,

    buyOrRent,
    handleChangeBuyOrRent,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    debtSuccessionDeposit,
    handleChangeDebtSuccessionDeposit,

    debtSuccessionMiscs,
    handleAddDebtSuccessionMisc,

    collaterals,
    handleAddCollaterals,

    specialTerms,
    handleChangeSpecialTerms,

    moveInDate,
    handleChangeMoveInDate,

    moveInDateType,
    handleChangeMoveInDateType,

    // contractAmount,
    // handleChangeContractAmount,

    // contractAmountNegotiable,
    // handleChangeContractAmountNegotiable,

    // remainingAmount,
    // handleChangeRemainingAmount,

    // interims,
    // handleAddInterim,

    verandaExtended,
    handleChangeVerandaExtended,

    verandaRemodelling,
    handleChangeVerandaRemodelling,

    rentArea,
    handleChangeRentArea,

    hasRentArea,
    handleChangeHasRentArea,

    extraOptions,
    handleChangeExtraOptions,

    rentTermYear,
    handleChangeRentTermYear,

    rentTermMonth,
    handleChangeRentTermMonth,

    rentTermNegotiable,
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

    hasDebtSuccession,
    handleChangeHasDebtSuccession,

    popup,
    closePopup,

    errPopup,
    closeErrPopup,

    openBackPopup,
    handleConfirmChangeBuyOrRent,
  } = useListingCreateForm(depth);

  const router = useRouter(depth);

  const { list: listingOptions } = useAPI_GetOptionList();

  const [isCoachVisible, setIsCoachVisible] = useState(false);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const currentForm = forms[forms.length - 1];
    if (currentForm === Forms.BuyOrRent) {
      setIsCoachVisible(true);
    }
  }, [forms]);

  if (!router?.query?.userAddressID) return null;

  return (
    <Panel width={panelWidth}>
      <ListingCreateForm
        // isAddInterimButtonDisabled={isAddInterimButtonDisabled}
        isAddCollateralDisabled={isAddCollateralDisabled}
        isAddDebtSuccessionDisabled={isAddDebtSuccessionDisabled}
        nextButtonDisabled={nextButtonDisabled}
        onClickNext={handleClickNext}
        forms={forms}
        buyOrRent={buyOrRent}
        onChangeBuyOrRent={handleChangeBuyOrRent}
        price={price}
        onChangePrice={handleChangePrice}
        monthlyRentFee={monthlyRentFee}
        onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
        quickSale={quickSale}
        onChangeQuickSale={handleChangeQuickSale}
        // contractAmount={contractAmount}
        // onChangeContractAmount={handleChangeContractAmount}
        // contractAmountNegotiable={contractAmountNegotiable}
        // onChangeContractAmountNegotiable={handleChangeContractAmountNegotiable}
        // remainingAmount={remainingAmount}
        // onChangeRemainingAmount={handleChangeRemainingAmount}
        // interims={interims}
        // onClickAddInterim={handleAddInterim}
        hasDebtSuccession={hasDebtSuccession}
        onChangeHasDebtSuccession={handleChangeHasDebtSuccession}
        debtSuccessionDeposit={debtSuccessionDeposit}
        onChangeDebtSuccessionDeposit={handleChangeDebtSuccessionDeposit}
        debtSuccessionMiscs={debtSuccessionMiscs}
        onClickAddDebtSuccessionMisc={handleAddDebtSuccessionMisc}
        collaterals={collaterals}
        onClickAddCollateral={handleAddCollaterals}
        specialTerms={specialTerms}
        onChangeSpecialTerms={handleChangeSpecialTerms}
        hasSpecialTerms={hasSpecialTerms}
        onChangeHasSpecialTerms={handleChangeHasSpecialTerms}
        hasMoveInDate={hasMoveInDate}
        onChangeHasMoveInDate={handleChangeHasMoveInDate}
        moveInDate={moveInDate}
        onChangeMoveInDate={handleChangeMoveInDate}
        moveInDateType={moveInDateType}
        onChangeMoveInDateType={handleChangeMoveInDateType}
        verandaExtended={verandaExtended}
        onChangeVerandaExtended={handleChangeVerandaExtended}
        verandaRemodelling={verandaRemodelling}
        onChangeVerandaRemodelling={handleChangeVerandaRemodelling}
        extraOptions={extraOptions}
        onChangeExtraOptions={handleChangeExtraOptions}
        listingOptions={listingOptions}
        hasRentArea={hasRentArea}
        onChangeHasRentArea={handleChangeHasRentArea}
        rentArea={rentArea}
        onChangeRentArea={handleChangeRentArea}
        rentTermYear={rentTermYear}
        onChangeRentTermYear={handleChangeRentTermYear}
        rentTermMonth={rentTermMonth}
        onChangeRentTermMonth={handleChangeRentTermMonth}
        rentTermNegotiable={rentTermNegotiable}
        onChangeRentTermNegotiable={handleChangeRentTermNegotiable}
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
        onClickBack={openBackPopup}
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
