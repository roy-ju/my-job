/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { styled } from 'twin.macro';

import { motion, useDragControls, useMotionValue } from 'framer-motion';

import { Chip, Separator } from '@/components/atoms';

import BottomSheet from '@/components/molecules/BottomSheet';

import { DanjiSummary } from '@/hooks/useMobileMapLayout';

import { formatNumberInKorean } from '@/utils';

import Routes from '@/router/routes';

import { RealestateType, describeRealestateType, BuyOrRent } from '@/constants/enums';

import CheveronDown from '@/assets/icons/chevron_down_24.svg';

import { Filter } from '../MobMapFilter/types';

const StyledDiv = styled.div``;

const MobDanjiSummary = React.memo(
  ({
    selectedDanjiSummary,
    filter,
    touchEvent,
    mapBuyOrRents,
    onTouchEvent,
  }: {
    selectedDanjiSummary?: DanjiSummary | null;
    filter?: Filter;
    touchEvent?: 'none' | 'touch' | 'scroll';
    mapBuyOrRents?: string;
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
          tw="w-full h-fit relative [z-index: 250] pointer-events-none mx-auto"
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
            dragConstraints={{ top: 0, bottom: (bottomSheetContentHeight || 0) + 60 }}
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
            <BottomSheet.Content ref={bottomSheetContentRef} pb="20">
              <div tw="flex items-center gap-2 py-2">
                {!!selectedDanjiSummary.suggestCount && (
                  <div>
                    <span tw="text-info [line-height: 1rem]">구해요&nbsp;&nbsp;</span>
                    <span tw="font-bold text-info [line-height: 1rem] text-nego-1000">
                      {selectedDanjiSummary.suggestCount}
                    </span>
                  </div>
                )}

                {mapBuyOrRents === BuyOrRent.Buy.toString() && !!selectedDanjiSummary?.buyListingCount && (
                  <>
                    {!!selectedDanjiSummary.suggestCount && <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />}
                    <div>
                      <span tw="text-info [line-height: 1rem]">매물&nbsp;&nbsp;</span>
                      <span tw="font-bold text-info [line-height: 1rem] text-green-1000">
                        {selectedDanjiSummary?.buyListingCount}
                      </span>
                    </div>
                  </>
                )}

                {mapBuyOrRents !== BuyOrRent.Buy.toString() && !!selectedDanjiSummary?.rentListingCount && (
                  <>
                    {!!selectedDanjiSummary.suggestCount && <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />}
                    <div>
                      <span tw="text-info [line-height: 1rem]">매물&nbsp;&nbsp;</span>
                      <span tw="font-bold text-info [line-height: 1rem] text-green-1000">
                        {selectedDanjiSummary?.rentListingCount}
                      </span>
                    </div>
                  </>
                )}

                {(!!selectedDanjiSummary.suggestCount ||
                  (mapBuyOrRents === BuyOrRent.Buy.toString() && !!selectedDanjiSummary?.buyListingCount) ||
                  (mapBuyOrRents !== BuyOrRent.Buy.toString() && !!selectedDanjiSummary?.rentListingCount)) && (
                  <Separator tw="min-h-[8px] min-w-[1px] bg-gray-300" />
                )}

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
                  <div tw="ml-auto [width: 94px] [min-width: 94px] text-info [line-height: 1rem] text-gray-700 [letter-spacing: -0.05em]">
                    {`거래일 ${selectedDanjiSummary.latestDealDateBuy}` || '-'}
                  </div>
                </div>
              )}

              {!!selectedDanjiSummary?.rentPrice && selectedDanjiSummary?.latestDealDateRent && (
                <div tw="flex items-center">
                  <span tw="text-b2 [width:36px] mr-2">전월세</span>
                  <span tw="text-b2 font-bold">{formatNumberInKorean(selectedDanjiSummary?.rentPrice || 0)}</span>
                  <div tw="ml-auto [width: 94px] [min-width: 94px] text-info [line-height: 1rem] text-gray-700 [letter-spacing: -0.05em]">
                    {`거래일 ${selectedDanjiSummary.latestDealDateRent}` || '-'}
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

export default MobDanjiSummary;
