/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';

import tw, { styled } from 'twin.macro';

import CloseButton from './CloseButton';

import NdaysNotShowButton from './NdaysNotShowButton';

import TodayNotShowButton from './TodayNotShowButton';

import { EventPopupProps } from './types';

const MobilePopupWrraper = styled.div`
  ${tw`relative bg-nego-800 [border-radius: 20px] [max-width: 340px] [max-height: 453px]`}
`;

export default function MobileType({
  nDays,
  handleConfirm,
  handleCancel,
  handleTodayNotShow,
  handleNDaysNotShow,
}: EventPopupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [calculatedHeight, setCalculatedHeight] = useState(0);

  const [calculatedWidth, setCalculatedWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef?.current && typeof window !== 'undefined') {
        const width = window.innerWidth - 40;
        const height = width * (4 / 3); // 너비의 75%
        setCalculatedWidth(width);
        setCalculatedHeight(height);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return (
    <>
      <MobilePopupWrraper
        ref={containerRef}
        style={{
          width: `${calculatedWidth}px`,
          height: `${calculatedHeight}px`,
        }}
      >
        <CloseButton colorType="white" handleClose={handleCancel} />
      </MobilePopupWrraper>
      {nDays && nDays > 1 && <NdaysNotShowButton nDays={nDays} handleNDaysNotShow={handleNDaysNotShow} />}
      {nDays && nDays === 1 && <TodayNotShowButton handleTodayNotShow={handleTodayNotShow} />}
    </>
  );
}
