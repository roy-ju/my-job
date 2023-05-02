import { MobAuthRequired, MobileContainer } from '@/components/atoms';
import { SuggestRegionalForm } from '@/components/templates';
import { memo, useCallback } from 'react';
import { OverlayPresenter } from '@/components/molecules';
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

    minArea,
    handleChangeMinArea,

    maxArea,
    handleChangeMaxArea,

    floor,
    handleChangeFloor,

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
  } = useSuggestRegionalForm();

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <MobAuthRequired ciRequired>
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
          monthlyRentFee={monthlyRentFee}
          onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
          minArea={minArea}
          onChangeMinArea={handleChangeMinArea}
          maxArea={maxArea}
          onChangeMaxArea={handleChangeMaxArea}
          floor={floor}
          onChangeFloor={handleChangeFloor}
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
      </MobileContainer>
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
    </MobAuthRequired>
  );
});
