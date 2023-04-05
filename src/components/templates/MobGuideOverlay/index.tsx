/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { motion } from 'framer-motion';
import tw from 'twin.macro';
import Chart from '@/assets/icons/chart.svg';
import HomeWithDollar from '@/assets/icons/home_with_dollar.svg';

import { Button, Checkbox } from '@/components/atoms';
import Close from '@/assets/icons/close_24.svg';
import { ReactNode, useRef } from 'react';

function Container({ children, onClick }: { onClick: () => void; children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      onClick={onClick}
      ref={containerRef}
      tw="fixed min-h-[100vh] max-w-mobile [margin: 0 auto] top-0 left-0 right-0 bottom-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0.75,
        zIndex: 9000,
      }}
    >
      {children}
    </div>
  );
}

export default function MobGuideOverlay({ disappearGuideOverlay }: { disappearGuideOverlay: () => void }) {
  return (
    <Container onClick={disappearGuideOverlay}>
      <div
        css={[
          tw`h-[2.5rem] bg-white shadow-[0px 8px 16px rgba(0, 0, 0, 0.14)] rounded-[60px] p-0.5 inline-flex items-center absolute top-[7.75rem] left-[1rem]`,
        ]}
      >
        <Button variant="ghost" tw="relative px-3 py-2 z-10 gap-1 h-[2.25rem]" onClick={() => {}}>
          <Chart css={[tw`text-white transition-colors`]} />
          <span
            css={[tw`overflow-hidden font-bold text-white transition-colors text-info whitespace-nowrap text-ellipsis`]}
          >
            단지 실거래
          </span>

          <motion.div layoutId="selection" tw="absolute top-0 left-0 bg-blue-700 w-full h-full -z-10 rounded-[60px]" />
        </Button>
        <Button variant="ghost" tw="relative z-10 px-3 py-2 h-[2.25rem] gap-1" onClick={() => {}}>
          <HomeWithDollar style={{ color: '#7048E8' }} />
        </Button>
      </div>

      <Button
        size="medium"
        tw="pointer-events-none absolute right-[1rem] bottom-[6.75rem] bg-[#212529]  whitespace-nowrap font-bold rounded-4xl text-info [z-index:1000]"
      >
        매물 추천받기
      </Button>

      <span
        tw="pointer-events-none absolute top-[11rem] left-[50%] -translate-x-1/2 text-info [line-height: 1rem] text-white"
        style={{ whiteSpace: 'nowrap' }}
      >
        지도에 표기되는 가격정보의 종류를 바꿀수 있어요
      </span>

      <span tw="pointer-events-none absolute right-[1rem] bottom-[5.25rem] text-info [line-height: 1rem] text-white">
        원하는 조건의 매물 &apos;추천을&apos; 요청할 수 있어요
      </span>

      <div tw="w-[100%] max-w-mobile flex items-center justify-between px-5 pb-9 absolute bottom-0">
        <div tw="flex items-center gap-2">
          <Checkbox />
          <span tw="pointer-events-none text-info [line-height: 1rem] text-white">다시보지 않기</span>
        </div>
        <Close style={{ color: 'white', cursor: 'pointer' }} />
      </div>
    </Container>
  );
}
