/* eslint-disable react-hooks/exhaustive-deps */
import { Chip, Separator } from '@/components/atoms';
import { RealestateType, describeRealestateType } from '@/constants/enums';
import { formatNumberInKorean } from '@/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import CheveronDown from '@/assets/icons/chevron_down_24.svg';
import { DanjiSummary } from '@/layouts/Mobile/MapLayout/useMapLayout';
import { useRouter } from 'next/router';
import { styled } from 'twin.macro';
import Routes from '@/router/routes';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import BottomSheet from '@/components/molecules/BottomSheet';
import { Filter } from '../MobMapFilter/types';

const StyledDiv = styled.div``;

const MobDanjiSummary = React.memo(
  ({
    selectedDanjiSummary,
    filter,
    touchEvent,
    onTouchEvent,
  }: {
    selectedDanjiSummary?: DanjiSummary | null;
    filter?: Filter;
    touchEvent?: 'none' | 'touch' | 'scroll';
    onTouchEvent?: (val: 'none' | 'touch' | 'scroll') => void;
  }) => {
    const router = useRouter();
    const bottomSheetWrraperRef = useRef<HTMLDivElement | null>(null);
    const bottomSheetContentRef = useRef<HTMLDivElement | null>(null);

    const [bottomSheetContentHeight, setBottomSheetContentHeight] = useState<number>();
    const [bottomSheetHeight, setBottomSheetHeight] = useState<number>();
    const [showBackDrop, setShowBackDrop] = useState(false);

    const controls = useDragControls();
    const y = useMotionValue(0);

    const closeBackDrop = useCallback((val: boolean) => {
      setShowBackDrop(val);
    }, []);

    const handleDragStart = () => {
      closeBackDrop(false);

      onTouchEvent?.('none');
    };

    const handleDragEnd = () => {
      closeBackDrop(false);
    };

    const handleDanjiDetail = () => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.DanjiDetail}`,
          query: {
            danjiID: selectedDanjiSummary?.danjiID,

            bor: filter?.buyOrRents || '',
          },
        },
        `/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${selectedDanjiSummary?.danjiID}`,
      );
    };

    useEffect(() => {
      if (selectedDanjiSummary && bottomSheetContentRef?.current) {
        setBottomSheetContentHeight(bottomSheetContentRef.current.offsetHeight);
      }

      if (selectedDanjiSummary && bottomSheetWrraperRef?.current) {
        setBottomSheetHeight(bottomSheetWrraperRef.current.offsetHeight);
      }
    }, [selectedDanjiSummary, bottomSheetContentRef]);

    useEffect(() => {
      if (bottomSheetContentHeight) {
        setTimeout(() => y.set(0), 100);
        setTimeout(() => onTouchEvent?.('none'), 200);
      }
    }, [touchEvent, selectedDanjiSummary]);

    if (!selectedDanjiSummary) return null;

    return (
      <>
        <motion.div
          ref={bottomSheetWrraperRef}
          tw="w-full max-w-mobile h-fit relative [z-index: 250] pointer-events-none mx-auto"
          initial={{ opacity: 0, y: 0, scaleY: 0 }}
          animate={{
            opacity: 1,
            y: -((bottomSheetHeight || 0) - 82),
            scaleY: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            drag="y"
            dragControls={controls}
            dragElastic={0.2}
            dragConstraints={{ top: 0, bottom: (bottomSheetContentHeight || 0) + 24 }}
            style={{ y }}
            dragPropagation
            tw="pointer-events-auto"
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <BottomSheet>
              <BottomSheet.Bezel />
            </BottomSheet>
          </motion.div>

          <motion.div tw="pointer-events-auto" style={{ y }} transition={{ duration: 0.1 }}>
            <BottomSheet.Header>
              <StyledDiv tw="flex items-center cursor-pointer" onClick={() => handleDanjiDetail()}>
                {selectedDanjiSummary?.realestateType === RealestateType.Apartment && (
                  <Chip tw="text-green-1000 bg-green">
                    {describeRealestateType(selectedDanjiSummary?.realestateType)}
                  </Chip>
                )}

                {selectedDanjiSummary?.realestateType === RealestateType.Officetel && (
                  <Chip tw="text-nego-1000 bg-nego-100">
                    {describeRealestateType(selectedDanjiSummary?.realestateType)}
                  </Chip>
                )}

                {selectedDanjiSummary?.realestateType === RealestateType.Dasaedae && (
                  <Chip tw="text-green-1000 bg-orange">
                    {describeRealestateType(selectedDanjiSummary?.realestateType)}
                  </Chip>
                )}

                {selectedDanjiSummary?.realestateType === RealestateType.Dagagoo && (
                  <Chip tw="text-orange-1000 bg-green">
                    {describeRealestateType(selectedDanjiSummary?.realestateType)}
                  </Chip>
                )}

                {selectedDanjiSummary?.realestateType === RealestateType.Yunrip && (
                  <Chip tw="text-gray-1000 bg-gray-100">
                    {describeRealestateType(selectedDanjiSummary?.realestateType)}
                  </Chip>
                )}

                {selectedDanjiSummary?.realestateType === RealestateType.Dandok && (
                  <Chip tw="text-blue-1000 bg-blue-100">
                    {describeRealestateType(selectedDanjiSummary?.realestateType)}
                  </Chip>
                )}
                <span tw="text-info font-bold ml-2 [font-size: 1rem]">{selectedDanjiSummary?.string}</span>
                <CheveronDown style={{ marginLeft: 'auto', transform: 'rotate(270deg)', cursor: 'pointer' }} />
              </StyledDiv>
            </BottomSheet.Header>
          </motion.div>

          <motion.div tw="pointer-events-auto" style={{ y }} transition={{ duration: 0.1 }}>
            <BottomSheet.Content ref={bottomSheetContentRef}>
              <div tw="flex items-center gap-2 py-2">
                <div>
                  <span tw="text-info [line-height: 1rem]">매매&nbsp;&nbsp;</span>
                  <span tw="font-bold text-info [line-height: 1rem] text-nego-1000">
                    {selectedDanjiSummary?.buyListingCount}
                  </span>
                </div>
                <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
                <div>
                  <span tw="text-info [line-height: 1rem]">전월세&nbsp;&nbsp;</span>
                  <span tw="font-bold text-info [line-height: 1rem] text-green-1000">
                    {selectedDanjiSummary?.rentListingCount}
                  </span>
                </div>
                <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
                <span tw="text-info [line-height: 1rem] text-gray-700">
                  사용승인일 {selectedDanjiSummary?.useAcceptedYear || '-'}
                </span>
                <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
                <span tw="text-info [line-height: 1rem] text-gray-700">
                  {selectedDanjiSummary?.saedaeCount.toLocaleString() || '-'}세대
                </span>
              </div>

              {!!selectedDanjiSummary.buyPrice && selectedDanjiSummary?.latestDealDateBuy && (
                <div tw="flex items-center mt-2">
                  <span tw="text-b2 [width:36px] mr-2">매매</span>
                  <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.buyPrice || 0)}</span>
                  <div tw="ml-auto">
                    <span tw="text-info [line-height: 1rem] text-gray-700">
                      {`거래일 ${selectedDanjiSummary.latestDealDateBuy}` || '-'}
                    </span>
                  </div>
                </div>
              )}

              {!!selectedDanjiSummary?.rentPrice && selectedDanjiSummary?.latestDealDateRent && (
                <div tw="flex items-center">
                  <span tw="text-b2 [width:36px] mr-2">전월세</span>
                  <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.rentPrice || 0)}</span>
                  <div tw="ml-auto">
                    <span tw="text-info [line-height: 1rem] text-gray-700">
                      {`거래일 ${selectedDanjiSummary?.latestDealDateRent}` || '-'}
                    </span>
                  </div>
                </div>
              )}
            </BottomSheet.Content>
            <div tw="[min-height: 82px] bg-white" />
          </motion.div>
        </motion.div>

        {showBackDrop && (
          <div tw="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] [z-index: 1300] pointer-events-auto" />
        )}
      </>
    );
  },
);

/* <div tw="w-[100%] mx-auto max-w-mobile [border-bottom-width: 1px] border-b-gray-1100 absolute rounded-t-lg px-4 py-5 bottom-[5rem] bg-white [z-index:500]"> */

export default MobDanjiSummary;
