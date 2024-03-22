import Image from 'next/image';

import BulbImage from '@/../public/static/images/subhome_bulb.png';

import DictImage from '@/../public/static/images/subhome_dict.png';

import HomeImage from '@/../public/static/images/subhome_home.png';

import StampImage from '@/../public/static/images/subhome_stamp.png';

import CheckImage from '@/../public/static/images/checked_3d.png';

import FolderImage from '@/../public/static/images/folder_3d.png';

import { Box, Flex, PreviewContainer, PreviewIconWrraper } from './widget/PreviewWidget';

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
            <button
              type="button"
              tw="flex-1 text-subhead_02 flex gap-2 items-center text-left text-yellow-1000 pl-3 py-4 [padding-right: 18px] border border-yellow-300 [background: rgba(255, 245, 217, 0.6)] [border-radius: 12px]"
              onClick={handleNavigateDeungibu}
            >
              <Image src={FolderImage.src} width={42} height={42} alt="folder" />

              <div tw="flex-col">
                <p tw="whitespace-nowrap">무료</p>
                <p tw="whitespace-nowrap">등기부 조회</p>
              </div>
            </button>
            <button
              type="button"
              tw="flex-1 text-subhead_02 flex gap-2 items-center text-left text-green-800 pl-3 py-4 [padding-right: 18px]  border border-green-300 [background: rgba(227, 252, 237, 0.6)] [border-radius: 12px]"
              onClick={handleNavigateCheckList}
            >
              <Image src={CheckImage.src} width={42} height={42} alt="check" />

              <div tw="flex-col">
                <p tw="whitespace-nowrap">매물 방문</p>
                <p tw="whitespace-nowrap">체크리스트</p>
              </div>
            </button>
          </div>
          <div tw="[min-height: 1px] w-full bg-gray-200 my-5" />
          <Flex tw="px-1 gap-5">
            <PreviewIconWrraper onClick={handleNavigateTradeProcess}>
              <Image src={HomeImage.src} width={56} height={56} alt="homeImage" />
              거래 절차
            </PreviewIconWrraper>
            <PreviewIconWrraper onClick={handleNavigateCommonSense}>
              <Image src={BulbImage.src} width={56} height={56} alt="bulbImage" />
              상식
            </PreviewIconWrraper>
            <PreviewIconWrraper onClick={handleNavigateSpecialTerms}>
              <Image src={StampImage.src} width={56} height={56} alt="stampImage" />
              계약서
            </PreviewIconWrraper>
            <PreviewIconWrraper onClick={handleNavigateDict}>
              <Image src={DictImage.src} width={56} height={56} alt="dictImage" />
              용어사전
            </PreviewIconWrraper>
          </Flex>
        </Box>
      </PreviewContainer>
    </>
  );
}
