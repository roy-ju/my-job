/* eslint-disable @typescript-eslint/no-unused-vars */
import tw, { styled } from 'twin.macro';

import CloseButton from './CloseButton';

import NdaysNotShowButton from './NdaysNotShowButton';

import TodayNotShowButton from './TodayNotShowButton';

import { EventPopupProps } from './types';

const PcPopupWrraper = styled.div`
  ${tw`relative bg-nego-800 w-[340px] h-[450px] [border-radius: 20px]`}
`;

export default function PcType({
  nDays,
  handleConfirm,
  handleCancel,
  handleTodayNotShow,
  handleNDaysNotShow,
}: EventPopupProps) {
  return (
    <>
      <PcPopupWrraper>
        <CloseButton colorType="white" handleClose={handleCancel} />
      </PcPopupWrraper>
      {nDays && nDays > 1 && <NdaysNotShowButton nDays={nDays} handleNDaysNotShow={handleNDaysNotShow} />}
      {nDays && nDays === 1 && <TodayNotShowButton handleTodayNotShow={handleTodayNotShow} />}
    </>
  );
}
