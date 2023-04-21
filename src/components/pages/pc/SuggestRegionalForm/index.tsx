import { Panel } from '@/components/atoms';
import { SuggestRegionalForm } from '@/components/templates';
import { memo } from 'react';
import { OverlayPresenter } from '@/components/molecules';
import useSuggestRegionalForm from './useSuggestRegionalForm';
import RegionForm from './RegionForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
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

    // moveInDate,
    // handleChangeMoveInDate,

    // moveInDateType,
    // handleChangeMoveInDateType,

    // remainingAmountDate,
    // handleChangeRemainingAmountDate,
  } = useSuggestRegionalForm();

  return (
    <>
      <Panel width={panelWidth}>
        <SuggestRegionalForm
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
        />
      </Panel>
      {isRegionListOpen && (
        <OverlayPresenter>
          <div tw="bg-white w-[380px] h-[600px] rounded-lg shadow">
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
    </>
  );
});
