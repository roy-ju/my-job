import Image from 'next/image';

import { theme } from 'twin.macro';

import { MarginTopFour } from '@/components/atoms/Margin';

import ButtonV2 from '@/components/atoms/ButtonV2';

import GOOGLE_TAG_BUTTON_ID from '@/constants/gtag_id';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import IconArrowRight from '@/assets/icons/icon_arrow_right_20_1.svg';

import TradeProcessImage from '@/../public/static/images/image_step.png';

import {
  ProcessImageContainer,
  ProcessTitleWrraper,
  ProcessTitleFirst,
  ProcessTitleSecond,
  ProcessContainer,
} from './widget/SubHomeWidget';

function ProcessTitle() {
  return (
    <ProcessTitleWrraper>
      <ProcessTitleFirst>부동산 거래 절차</ProcessTitleFirst>
      <ProcessTitleSecond>어렵기만한 거래 절차, A부터 Z까지 모두 다 알려드려요!</ProcessTitleSecond>
    </ProcessTitleWrraper>
  );
}

function ProcessMoreButton({ handleClick }: { handleClick: () => void }) {
  return (
    <ButtonV2
      id={GOOGLE_TAG_BUTTON_ID.SUBHOME_TRADE_PROCESS_MORE}
      variant="white"
      tw="w-full flex gap-0.5"
      size="bigger"
      radius="none"
      onClick={handleClick}
    >
      더보기
      <IconArrowRight color={theme`colors.gray.600`} />
    </ButtonV2>
  );
}

export default function Process({ handleClick }: { handleClick: () => void }) {
  const { platform } = useCheckPlatform();

  return (
    <ProcessContainer>
      <ProcessTitle />
      <MarginTopFour />
      <ProcessImageContainer onClick={handleClick}>
        <Image
          id={platform === 'pc' ? 'negocio-trade-process-image-pc' : 'negocio-trade-process-image-mobile'}
          src={TradeProcessImage.src}
          alt="tradeProcessImage"
          tw="w-full h-full object-left [min-height: 378px]"
          width={375}
          height={378}
          quality={100}
        />
      </ProcessImageContainer>
      <div tw="bg-gray-200 w-full [min-height: 1px]" />
      <ProcessMoreButton handleClick={handleClick} />
    </ProcessContainer>
  );
}
