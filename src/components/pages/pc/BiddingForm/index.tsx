import { memo } from 'react';

import { AuthRequired, Panel } from '@/components/atoms';

import { BiddingForm } from '@/components/templates';

import useBiddingForm from './useBiddingForm';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const {
    listing,
    displayAddress,

    type,
    handleChangeType,

    price,
    handleChangePrice,

    monthlyRentFee,
    handleChangeMonthlyRentFee,

    moveInDate,
    handleChangeMoveInDate,

    moveInDateType,
    handleChangeMoveInDateType,

    etcs,
    handleChangeEtcs,

    description,
    handleChangeDescription,

    nextButtonDisabled,
    handleClickNext,
  } = useBiddingForm(depth);

  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        <BiddingForm
          listing={listing}
          displayAddress={displayAddress}
          type={type}
          onChangeType={handleChangeType}
          price={price}
          onChangePrice={handleChangePrice}
          monthlyRentFee={monthlyRentFee}
          onChangeMonthlyRentFee={handleChangeMonthlyRentFee}
          moveInDate={moveInDate}
          onChangeMoveInDate={handleChangeMoveInDate}
          moveInDateType={moveInDateType}
          onChangeMoveInDateType={handleChangeMoveInDateType}
          etcs={etcs}
          onChangeEtcs={handleChangeEtcs}
          description={description}
          onChangeDescription={handleChangeDescription}
          nextButtonDisabled={nextButtonDisabled}
          onClickNext={handleClickNext}
        />
      </Panel>
    </AuthRequired>
  );
});
