import React from 'react';

import { Button } from '@/components/atoms';

import ChevronRight from '@/assets/icons/chevron_right_12.svg';

import NegocioGrayLogo from '@/assets/icons/negocio_gray_logo.svg';

import styled from '@emotion/styled';

import BannerImage2 from '@/../public/static/images/lawqna_main_banner2.png';

const StyledBox = styled.div``;

function Banner({ handleClickHome }: { handleClickHome?: () => void }) {
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

export default Banner;
