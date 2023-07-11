import { Button } from '@/components/atoms';
import React from 'react';

import ChevronRight from '@/assets/icons/chevron_right_12.svg';
import NegocioGrayLogo from '@/assets/icons/negocio_gray_logo.svg';
import Routes from '@/router/routes';
import styled from '@emotion/styled';

import BannerImage from '@/../public/static/images/lawqna_main_banner.png';
import BannerImage2 from '@/../public/static/images/lawqna_main_banner2.png';

const StyledBox = styled.div``;

export function Banner({ handleClickCounseling }: { handleClickCounseling?: () => void }) {
  return (
    <StyledBox
      tw="[border-radius: 12px] min-h-[118px] [max-width: 340px] mx-auto relative p-5 cursor-pointer"
      style={{
        backgroundImage: `url('${BannerImage.src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      onClick={handleClickCounseling}
    >
      <p tw="text-info [line-height: 16.8px] [letter-spacing: -0.4px] text-gray-300 mb-1">
        우성남 변호사가 답변해 드려요
      </p>

      <h1 tw="text-b1 [line-height: 16.8px] [letter-spacing: -0.4px] text-gray-300 font-bold">
        <a href={`/${Routes.LawQna}`} tw="pointer-events-none">
          부동산 법률 무료 상담 Q&A
        </a>
      </h1>

      <Button
        variant="secondary"
        tw="absolute bottom-5 h-[28px] text-info [line-height: 12px] bg-blue [border-radius: 14px] font-medium"
      >
        상담 게시판 바로가기 <ChevronRight />
      </Button>
    </StyledBox>
  );
}

export function LegalPageBanner({ handleClickHome }: { handleClickHome?: () => void }) {
  return (
    <StyledBox
      tw="[border-radius: 12px] min-h-[110px] [max-width: 340px] mx-auto relative p-5 cursor-pointer"
      onClick={handleClickHome}
      style={{
        backgroundImage: `url('${BannerImage2.src}')`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <h1 tw="text-b1 [line-height: 24px] [letter-spacing: -0.25px] text-white">
        부동산 거래 서비스 네고시오를 운영하는
      </h1>

      <p tw="text-b1 [line-height: 24px] [letter-spacing: -0.25px] text-white mb-1 font-bold">
        우성남 변호사가 법률 상담에 답변드립니다.
      </p>

      <div tw="flex flex-row items-center">
        <p tw="text-b2 [line-height: 20px] [letter-spacing: -0.25px] text-gray-500 mr-2">부동산 거래 안전하게</p>
        <NegocioGrayLogo />
      </div>
    </StyledBox>
  );
}
