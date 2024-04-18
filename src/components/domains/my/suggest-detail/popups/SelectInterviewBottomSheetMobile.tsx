import { useCallback, useEffect, useRef } from 'react';

import tw, { styled } from 'twin.macro';

import { motion, PanInfo, useAnimationControls, useDragControls, useMotionValue } from 'framer-motion';

import { KeyedMutator } from 'swr';

import { toast } from 'react-toastify';

import ButtonV2 from '@/components/atoms/ButtonV2';

import BottomSheet from '@/components/molecules/BottomSheet';

import interviews from '@/components/domains/suggest/form/constants/interviews';

import CheckBoxButton from '@/components/domains/suggest/form/ui/CheckBoxButton';

import getIncludeValue from '@/components/domains/suggest/utils/getIncludeValue';

import { apiService } from '@/services';

import { SuggestDetailResponse } from '@/services/suggests/types';

import useSelectInterviewPopupHandler from '../hooks/useSelectInterviewPopupHandler';

const bottomSheetHeight = 398;

const bottomSheetContentHeight = 318;

const virtualHeight = 82;

const CheckBoxWrraper = styled.div`
  ${tw`flex flex-col gap-5 pt-4 pb-5 text-gray-1000`}
`;

const ButtonWrraper = styled.div`
  ${tw`flex flex-row w-full gap-3 pt-5 pb-4`}
`;

interface SelectInterviewBottomSheetMobileProps {
  suggestID: number;
  interviewAvaliableTimes: string;
  mutateSuggestDetail: KeyedMutator<(SuggestDetailResponse & ErrorResponse) | null>;
  handleOpenOrCloseSelectInterviewPopup: (v: boolean) => void;
}

export default function SelectInterviewBottomSheetMobile({
  suggestID,
  interviewAvaliableTimes,
  mutateSuggestDetail,
  handleOpenOrCloseSelectInterviewPopup,
}: SelectInterviewBottomSheetMobileProps) {
  const variants = {
    visible: { opacity: 1, y: virtualHeight, scaleY: 1 },
    hidden: { opacity: 0, y: bottomSheetHeight, scaleY: 0 },
    closed: {
      opacity: 1,
      y: bottomSheetHeight + virtualHeight, // 아래로 조금 내려가면서 사라짐
      scaleY: 0.95, // 약간 축소
    },
  };

  const bottomSheetWrraperRef = useRef<HTMLDivElement | null>(null);
  const bottomSheetContentRef = useRef<HTMLDivElement | null>(null);

  const dragControls = useDragControls();

  const animationControls = useAnimationControls();

  const y = useMotionValue(0);

  const { selectedInterviewAvailabletimes, handleChangeSelectedInterviewAvailabletimes } =
    useSelectInterviewPopupHandler({ interviewAvaliableTimes });

  const handleCloseBottomSheet = useCallback(
    () => handleOpenOrCloseSelectInterviewPopup(false),
    [handleOpenOrCloseSelectInterviewPopup],
  );

  const handleUpdateAvailableInterviewTimes = useCallback(async () => {
    await apiService.updateInterviewAvailableTimes({
      suggestID,
      interviewAvailableTimes: selectedInterviewAvailabletimes.join(','),
    });

    toast.success('인터뷰 시간이 변경되었습니다.');

    await mutateSuggestDetail();

    handleCloseBottomSheet();
  }, [mutateSuggestDetail, handleCloseBottomSheet, selectedInterviewAvailabletimes, suggestID]);

  const handleDragEnd = async (_: any, i: PanInfo) => {
    if (i.offset.y < 0) return;

    if (i.offset.y > 50) {
      handleOpenOrCloseSelectInterviewPopup(false);
    }
  };

  useEffect(() => {
    animationControls.start('visible');
  }, [animationControls]);

  return (
    <motion.div
      ref={bottomSheetWrraperRef}
      tw="w-full h-fit fixed [z-index: 250] pointer-events-none mx-auto bottom-0"
      initial="hidden"
      animate={animationControls}
      exit="closed"
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        drag="y"
        dragControls={dragControls}
        dragElastic={0.2}
        dragConstraints={{ top: 0, bottom: bottomSheetContentHeight + 80 }}
        style={{ y }}
        dragPropagation
        tw="pointer-events-auto"
        onDragEnd={handleDragEnd}
      >
        <BottomSheet>
          <BottomSheet.BezelV2 />
        </BottomSheet>
      </motion.div>

      <motion.div tw="pointer-events-auto -mt-px" style={{ y }} transition={{ duration: 0.1 }} dragElastic={0.2}>
        <BottomSheet.Header tw="[padding-block: 15px] text-heading_01">인터뷰 시간 선택</BottomSheet.Header>
      </motion.div>

      <motion.div tw="pointer-events-auto -mt-px" style={{ y }} transition={{ duration: 0.1 }}>
        <BottomSheet.Content ref={bottomSheetContentRef}>
          <CheckBoxWrraper>
            {interviews.slice(0, interviews.length - 1).map((item) => (
              <CheckBoxButton
                key={item}
                value={item}
                label={item}
                isAnimate={false}
                selected={getIncludeValue(item, selectedInterviewAvailabletimes)}
                handleClick={handleChangeSelectedInterviewAvailabletimes}
              />
            ))}
          </CheckBoxWrraper>
          <ButtonWrraper>
            <ButtonV2 variant="gray" size="bigger" tw="w-full" onClick={handleCloseBottomSheet}>
              닫기
            </ButtonV2>
            <ButtonV2
              size="bigger"
              tw="w-full"
              onClick={handleUpdateAvailableInterviewTimes}
              disabled={selectedInterviewAvailabletimes.length === 0}
            >
              변경하기
            </ButtonV2>
          </ButtonWrraper>
        </BottomSheet.Content>
        <div tw="[min-height: 82px] bg-white -mt-px" />
      </motion.div>
    </motion.div>
  );
}
