import Image from 'next/image';

import { MarginTopFour } from '@/components/atoms/Margin';

import TextButton from '@/components/atoms/TextButton';

import TradeProcessImage from '@/../public/static/images/image_step.png';

import useCheckPlatform from '@/hooks/useCheckPlatform';
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
    <TextButton
      title="더보기"
      variant="right"
      color="gray700"
      size="large"
      tw="w-full text-center border-t border-t-gray-200 [padding-block: 17px]"
      onClick={handleClick}
    />
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
          quality={100} // 품질을 조절할 수 있는 속성
        />
      </ProcessImageContainer>
      <ProcessMoreButton handleClick={handleClick} />
    </ProcessContainer>
  );
}
