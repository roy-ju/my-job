import { useEffect, useRef, useState } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import { Loading, MobileContainer } from '@/components/atoms';

import { Forms } from '@/components/templates/ListingCreateForm/FormRenderer';

import { ListingCreateForm as ListingCreateFormTemplate } from '@/components/templates';

import useFetchOptionList from '@/services/listing/useFetchOptionList';

import Routes from '@/router/routes';

import CoachScrollUp from '@/assets/icons/coach_scroll_up.svg';

import useListingCreateForm from './useListingCreateForm';

const BackPopup = dynamic(() => import('@/components/domains/listings/create-form/popups/BackPopup'), { ssr: false });

const BuyOrRentChangePopup = dynamic(
  () => import('@/components/domains/listings/create-form/popups/BuyOrRentChangePopup'),
  { ssr: false },
);

const ErrorPopup = dynamic(() => import('@/components/domains/listings/create-form/popups/ErrorPopup'), { ssr: false });

const ListingCreateForm = () => {
  const {
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

    quickSale,
    handleChangeQuickSale,

    hasDebtSuccession,
    handleChangeHasDebtSuccession,

    debtSuccessionDeposit,
    handleChangeDebtSuccessionDeposit,

    debtSuccessionMiscs,
    handleAddDebtSuccessionMisc,

    rentEndDate,
    handleChangeRentEndDate,

    collaterals,
    handleAddCollaterals,

    specialTerms,
    handleChangeSpecialTerms,

    hasSpecialTerms,
    handleChangeHasSpecialTerms,

    hasMoveInDate,
    handleChangeHasMoveInDate,

    moveInDate,
    handleChangeMoveInDate,

    moveInDateType,
    handleChangeMoveInDateType,

    hasRentArea,
    handleChangeHasRentArea,

    rentArea,
    handleChangeRentArea,

    verandaExtended,
    handleChangeVerandaExtended,

    verandaRemodelling,
    handleChangeVerandaRemodelling,

    extraOptions,
    handleChangeExtraOptions,

    rentTermYear,
    handleChangeRentTermYear,

    rentTermMonth,
    handleChangeRentTermMonth,

    rentTermNegotiable,
    handleChangeRentTermNegotiable,

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

    popup,
    closePopup,

    errPopup,
    closeErrPopup,

    openBackPopup,
    handleConfirmChangeBuyOrRent,
  } = useListingCreateForm();

  const router = useRouter();

  const { list: listingOptions } = useFetchOptionList();

  const [isCoachVisible, setIsCoachVisible] = useState(false);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const currentForm = forms[forms.length - 1];

    if (currentForm === Forms.BuyOrRent && !router?.query?.isBack) {
      setIsCoachVisible(true);
    }
  }, [forms, router]);

  useEffect(() => {
    if (!router.query.userAddressID) {
      router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=2`);
    }
  }, [router]);

  if (!router?.query?.userAddressID) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <ListingCreateFormTemplate
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
        hasDebtSuccession={hasDebtSuccession}
        onChangeHasDebtSuccession={handleChangeHasDebtSuccession}
        debtSuccessionDeposit={debtSuccessionDeposit}
        onChangeDebtSuccessionDeposit={handleChangeDebtSuccessionDeposit}
        debtSuccessionMiscs={debtSuccessionMiscs}
        onClickAddDebtSuccessionMisc={handleAddDebtSuccessionMisc}
        rentEndDate={rentEndDate}
        onChangeRentEndDate={handleChangeRentEndDate}
        collaterals={collaterals}
        onClickAddCollateral={handleAddCollaterals}
        hasSpecialTerms={hasSpecialTerms}
        onChangeHasSpecialTerms={handleChangeHasSpecialTerms}
        specialTerms={specialTerms}
        onChangeSpecialTerms={handleChangeSpecialTerms}
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
        listingOptions={listingOptions.filter((ele) => ele?.name !== '베란다 확장' && ele?.name !== '2년 내 올수리')}
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

      {popup === 'back' && <BackPopup handleCancel={closePopup} handleConfirm={handleClickBack} />}

      {popup === 'buyOrRentChagne' && (
        <BuyOrRentChangePopup handleConfirm={handleConfirmChangeBuyOrRent} handleCancel={closePopup} />
      )}

      {errPopup !== '' && <ErrorPopup message={errPopup} handleConfirm={closeErrPopup} />}
    </MobileContainer>
  );
};

export default ListingCreateForm;
