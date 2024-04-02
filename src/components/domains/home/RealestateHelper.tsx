import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import TextButton from '@/components/atoms/TextButton';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

import WomanImage from '@/../public/static/images/image_emoji_woman.png';

import CheckImage from '@/../public/static/images/checked_3d.png';

import FolderImage from '@/../public/static/images/folder_3d.png';

import BulbImage from '@/../public/static/images/icon_bulb.png';

import DictImage from '@/../public/static/images/icon_dictionary.png';

import RunningImage from '@/../public/static/images/icon_running.png';

import StampImage from '@/../public/static/images/icon_stamp.png';

import { Flex, PreviewIconWrraper } from '../realestate-helper/sub-home/widget/PreviewWidget';

import useNavigationHandler from './hooks/useNavigationHandler';

const SectionContainer = styled.section`
  ${tw`flex flex-col px-5`}
`;

const TitleWrraper = styled.div`
  ${tw`flex items-center gap-2`}
`;

const Title = styled.h2`
  ${tw`text-heading_02`}
`;

const HelperTopContainer = styled.div`
  ${tw`flex justify-center gap-3`}
`;

const SeperatorLine = styled.div`
  ${tw`[min-height: 1px] w-full bg-gray-200 my-5`}
`;

const PreviewButton = styled.button`
  ${tw`text-subhead_02 flex gap-2 items-center text-left pl-3 py-4 [padding-right: 18px] border [border-radius: 12px] flex-1`}
`;

export default function RealestateHelper() {
  const { makeUrl, handleNavigateSubPage, handleNavigateSubHomeAll } = useNavigationHandler();

  return (
    <SectionContainer>
      <TitleWrraper>
        <Title tw="text-heading_02">부동산 거래 도우미</Title>
        <Image width={20} height={20} quality={100} src={WomanImage} alt="" />
        <TextButton
          id={GOOGLE_TAG_BUTTON_ID.HOME_SUBHOME_ALL}
          variant="right"
          size="large"
          color="gray600"
          title="전체보기"
          tw="ml-auto"
          onClick={handleNavigateSubHomeAll}
        />
      </TitleWrraper>

      <MarginTopTwenty />

      <HelperTopContainer>
        <PreviewButton
          id={GOOGLE_TAG_BUTTON_ID.HOME_SUBHOME_REALESTATE_DOCUMENT}
          type="button"
          tw="text-yellow-1000 border-yellow-300 [background: rgba(255, 245, 217, 0.6)] [min-width: 161.5px]"
          onClick={() => handleNavigateSubPage(makeUrl('documentList'))}
        >
          <Image src={FolderImage.src} width={42} height={42} alt="folder" />

          <div tw="flex-col">
            <p tw="whitespace-nowrap">무료</p>
            <p tw="whitespace-nowrap">등기부 조회</p>
          </div>
        </PreviewButton>
        <PreviewButton
          id={GOOGLE_TAG_BUTTON_ID.HOME_SUBHOME_LISTING_CHECKLIST}
          type="button"
          tw="text-green-800 border-green-300 [background: rgba(227, 252, 237, 0.6)] [min-width: 161.5px]"
          onClick={() => handleNavigateSubPage(makeUrl('listingCheckList'))}
        >
          <Image src={CheckImage.src} width={42} height={42} alt="check" />

          <div tw="flex-col">
            <p tw="whitespace-nowrap">매물 방문</p>
            <p tw="whitespace-nowrap">체크리스트</p>
          </div>
        </PreviewButton>
      </HelperTopContainer>

      <SeperatorLine />

      <Flex tw="gap-5 px-4 justify-between">
        <PreviewIconWrraper
          onClick={() => handleNavigateSubPage(makeUrl('tradeProcess'))}
          id={GOOGLE_TAG_BUTTON_ID.HOME_SUBHOME_TRADE_PROCESS}
        >
          <Image src={RunningImage.src} width={56} height={56} alt="runningImage" tw="h-14" />
          거래 절차
        </PreviewIconWrraper>
        <PreviewIconWrraper
          id={GOOGLE_TAG_BUTTON_ID.HOME_SUBHOME_COMMON_SENSE}
          onClick={() => handleNavigateSubPage(makeUrl('commonSense'))}
        >
          <Image src={BulbImage.src} width={56} height={56} alt="bulbImage" tw="h-14" />
          상식
        </PreviewIconWrraper>
        <PreviewIconWrraper
          id={GOOGLE_TAG_BUTTON_ID.HOME_SUBHOME_COMMON_SENSE}
          onClick={() => handleNavigateSubPage(makeUrl('specialTerms'))}
        >
          <Image src={StampImage.src} width={56} height={56} alt="stampImage" tw="h-14" />
          계약서
        </PreviewIconWrraper>
        <PreviewIconWrraper
          id={GOOGLE_TAG_BUTTON_ID.HOME_SUBHOME_DICTIONARY}
          onClick={() => handleNavigateSubPage(makeUrl('dict'))}
        >
          <Image src={DictImage.src} width={56} height={56} alt="dictImage" tw="h-14" />
          용어사전
        </PreviewIconWrraper>
      </Flex>
    </SectionContainer>
  );
}
