import Image from 'next/image';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

import BulbImage from '@/../public/static/images/icon_bulb.png';

import DictImage from '@/../public/static/images/icon_dictionary.png';

import RunningImage from '@/../public/static/images/icon_running.png';

import StampImage from '@/../public/static/images/icon_stamp.png';

import CheckImage from '@/../public/static/images/checked_3d.png';

import FolderImage from '@/../public/static/images/folder_3d.png';

import { Box, Flex, PreviewButton, PreviewContainer, PreviewIconWrraper } from './widget/PreviewWidget';

export default function Preview({
  handleNavigateTradeProcess,
  handleNavigateDeungibu,
  handleNavigateCheckList,
  handleNavigateSpecialTerms,
  handleNavigateCommonSense,
  handleNavigateDict,
}: {
  handleNavigateTradeProcess: () => void;
  handleNavigateDeungibu: () => void;
  handleNavigateCheckList: () => void;
  handleNavigateSpecialTerms: () => void;
  handleNavigateCommonSense: () => void;
  handleNavigateDict: () => void;
}) {
  return (
    <>
      <PreviewContainer>
        <Box tw="px-5">
          <div tw="flex gap-3 justify-center">
            <PreviewButton
              id={GOOGLE_TAG_BUTTON_ID.SUBHOME_NAVIGATION_REALESTATE_DOCUMENT}
              type="button"
              tw="text-yellow-1000 border-yellow-300 [background: rgba(255, 245, 217, 0.6)]"
              onClick={handleNavigateDeungibu}
            >
              <Image src={FolderImage.src} width={42} height={42} alt="folder" />

              <div tw="flex-col">
                <p tw="whitespace-nowrap">무료</p>
                <p tw="whitespace-nowrap">등기부 조회</p>
              </div>
            </PreviewButton>
            <PreviewButton
              id={GOOGLE_TAG_BUTTON_ID.SUBHOME_NAVIGATION_LISTING_CHECKLIST}
              type="button"
              tw="text-green-800 border-green-300 [background: rgba(227, 252, 237, 0.6)]"
              onClick={handleNavigateCheckList}
            >
              <Image src={CheckImage.src} width={42} height={42} alt="check" />

              <div tw="flex-col">
                <p tw="whitespace-nowrap">매물 방문</p>
                <p tw="whitespace-nowrap">체크리스트</p>
              </div>
            </PreviewButton>
          </div>
          <div tw="[min-height: 1px] w-full bg-gray-200 my-5" />
          <Flex tw="px-1 gap-5 justify-between">
            <PreviewIconWrraper
              id={GOOGLE_TAG_BUTTON_ID.SUBHOME_NAVIGATION_LISTING_CHECKLIST}
              onClick={handleNavigateTradeProcess}
            >
              <Image src={RunningImage.src} width={56} height={56} alt="runningImage" tw="h-14" />
              거래 절차
            </PreviewIconWrraper>
            <PreviewIconWrraper
              id={GOOGLE_TAG_BUTTON_ID.SUBHOME_NAVIGATION_COMMON_SENSE}
              onClick={handleNavigateCommonSense}
            >
              <Image src={BulbImage.src} width={56} height={56} alt="bulbImage" tw="h-14" />
              상식
            </PreviewIconWrraper>
            <PreviewIconWrraper
              id={GOOGLE_TAG_BUTTON_ID.SUBHOME_NAVIGATION_CONTRACT}
              onClick={handleNavigateSpecialTerms}
            >
              <Image src={StampImage.src} width={56} height={56} alt="stampImage" tw="h-14" />
              계약서
            </PreviewIconWrraper>
            <PreviewIconWrraper id={GOOGLE_TAG_BUTTON_ID.SUBHOME_NAVIGATION_DICTIONARY} onClick={handleNavigateDict}>
              <Image src={DictImage.src} width={56} height={56} alt="dictImage" tw="h-14" />
              용어사전
            </PreviewIconWrraper>
          </Flex>
        </Box>
      </PreviewContainer>
    </>
  );
}
