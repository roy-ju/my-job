import { Button } from '@/components/atoms';
import React from 'react';

import ChevronRight from '@/assets/icons/chevron_right_12.svg';
import NegocioGrayLogo from '@/assets/icons/negocio_gray_logo.svg';
import Routes from '@/router/routes';
import styled from '@emotion/styled';

import BannerImage from '@/../public/static/images/lawqna_main_banner.png';
import BannerImage2 from '@/../public/static/images/lawqna_main_banner2.png';
import { motion } from 'framer-motion';

const StyledBox = styled.div``;

export function Banner({ handleClickCounseling }: { handleClickCounseling?: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      tw="[border-radius: 12px] min-h-[88px] [min-width: 340px] mx-auto relative p-5 py-4"
      style={{
        backgroundImage: `url('${BannerImage.src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      onClick={handleClickCounseling}
    >
      <h1 tw="text-b2 [line-height: 16.8px] [letter-spacing: -0.4px] text-gray-300 font-bold mb-2">
        <a href={`/${Routes.LawQna}`} tw="pointer-events-none">
          부동산 법률 무료 상담 Q&A
        </a>
      </h1>

      <Button
        variant="primary"
        tw="absolute bottom-4 w-[118px] h-[24px] px-3 [font-size: 10px] [line-height: 12px] [border-radius: 14px] font-medium whitespace-nowrap"
      >
        상담 게시판 바로가기 <ChevronRight />
      </Button>
    </motion.div>
  );
}

export function LegalPageBanner({ handleClickHome }: { handleClickHome?: () => void }) {
  return (
    <StyledBox
      tw="[border-radius: 12px] min-h-[140px] [min-width: 340px] mx-auto relative p-5"
      style={{
        backgroundImage: `url('${BannerImage2.src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <h1 tw="text-b2 [line-height: 24px] [letter-spacing: -0.25px] text-white font-bold mb-1">
        변호사가 직접 답변해 드립니다.
      </h1>

      <p tw="text-info [line-height: 24px] [letter-spacing: -0.25px] text-white mb-2">
        부동산 거래・분쟁・절차・문서 등 관련해서
        <br />
        궁금한 부분이 있으시면 편하게 물어보세요.
      </p>

      <div tw="flex flex-row items-center gap-2">
        <p tw="text-info [line-height: 20px] [letter-spacing: -0.25px] text-gray-500">부동산 거래 서비스</p>
        <NegocioGrayLogo />
        <Button
          variant="primary"
          tw="w-[81px] h-[24px] px-3 [font-size: 10px] [line-height: 12px] [border-radius: 14px] font-medium whitespace-nowrap"
          onClick={handleClickHome}
        >
          홈 바로가기 <ChevronRight />
        </Button>
      </div>
    </StyledBox>
  );
}
