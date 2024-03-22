import Image from 'next/image';

import { MarginTopEight } from '@/components/atoms/Margin';

import FolderImage from '@/../public/static/images/subhome_folder.png';

import CheckImage from '@/../public/static/images/subhome_check.png';

import DocumentImage from '@/../public/static/images/subhome_document.png';

import {
  ColorBox,
  Column,
  RequiredItemContainer,
  RequiredTitle,
  RequiredTitleHighlight,
  RequiredContainer,
} from './widget/SubHomeWidget';

export default function Required({
  handleNavigateDeungibu,
  handleNavigateCheckList,
  handleNavigateSpecialTerms,
}: {
  handleNavigateDeungibu: () => void;
  handleNavigateCheckList: () => void;
  handleNavigateSpecialTerms: () => void;
}) {
  return (
    <RequiredContainer>
      <RequiredTitle>
        부동산 계약 전
        <br />꼭 해야할 필수 항목 <RequiredTitleHighlight>3가지!</RequiredTitleHighlight>
      </RequiredTitle>

      <MarginTopEight />

      <Column>
        <RequiredItemContainer onClick={handleNavigateDeungibu}>
          <ColorBox tw="[background: rgba(255, 245, 217, 0.6)]">
            <p tw="text-heading_01 text-yellow-1000 mb-1">등기부 조회</p>
            <p tw="text-body_02 text-gray-800">부동산에서 가장 중요한 등기부, 무료로 조회해보세요!</p>
            <Image src={FolderImage.src} width={88} height={88} alt="folder" />
          </ColorBox>
        </RequiredItemContainer>

        <RequiredItemContainer onClick={handleNavigateCheckList}>
          <ColorBox tw="[background: rgba(227, 252, 237, 0.6)]">
            <p tw="text-heading_01 text-green-800 mb-1">매물 체크리스트</p>
            <p tw="text-body_02 text-gray-800">집보는데 뭘 봐야할지 모른다면?</p>
            <Image src={CheckImage.src} width={88} height={88} alt="check" />
          </ColorBox>
        </RequiredItemContainer>

        <RequiredItemContainer onClick={handleNavigateSpecialTerms}>
          <ColorBox tw="[background: rgba(237, 242, 255, 0.6)]">
            <p tw="text-heading_01 text-blue-800 mb-1">계약서 및 특약사항</p>
            <p tw="text-body_02 text-gray-800">계약서 작성부터 특약사항까지 계약에 필요한 모든 것!</p>
            <Image src={DocumentImage.src} width={88} height={88} alt="document" />
          </ColorBox>
        </RequiredItemContainer>
      </Column>
    </RequiredContainer>
  );
}
