import Image from 'next/image';

import tw, { styled } from 'twin.macro';

import BannerImage from '@/../public/static/images/law_qna_banner.png';

import useNavigationHandler from './hooks/useNavigationHandler';

const BannerContainer = styled.button`
  ${tw`flex gap-4 justify-between [width: calc(100% - 40px)] mx-auto [background: rgba(255, 233, 224, 0.4)] rounded-2xl px-5 [padding-block: 27px] text-left`}
`;

const TextWrraper = styled.div`
  ${tw`flex flex-col`}

  p:nth-of-type(1) {
    ${tw`text-orange-500 text-subhead_02 mb-2.5`}
  }

  p:nth-of-type(2) {
    ${tw`mb-1 text-gray-900 text-heading_03`}
  }

  p:nth-of-type(3) {
    ${tw`text-gray-700 text-body_01`}
  }
`;

export default function LawQna() {
  const { handleNavigateLawQna } = useNavigationHandler();

  return (
    <section>
      <BannerContainer onClick={handleNavigateLawQna}>
        <TextWrraper>
          <p>안전한 거래 도와드릴게요!</p>
          <p>무료 법률 상담 받기</p>
          <p>어려운 부동산 법률, 변호사에게 물어보기</p>
        </TextWrraper>
        <Image src={BannerImage.src} width={80} height={80} alt="lawQnaBanner" />
      </BannerContainer>
    </section>
  );
}
