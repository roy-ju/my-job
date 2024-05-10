import { useRef } from 'react';

import dynamic from 'next/dynamic';

import { MarginTopTwelve } from '@/components/atoms/Margin';

import FlexContents from '@/components/atoms/FlexContents';

import ClassNames from '@/constants/classNames';

import useSaveScrollLocation from '@/hooks/useSaveScrollLocation';

import useRestoreScrollPosition from '@/hooks/useScrollResotoration';

import Header from './Header';

import Contents from './Contents';

import Footer from './Footer';

const EventBanner = dynamic(() => import('@/components/organisms/global/EventBanner'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useSaveScrollLocation(containerRef, 'home');

  useRestoreScrollPosition(containerRef, 'home');

  return (
    <>
      <div tw="h-full flex flex-col">
        <Header />
        <EventBanner />
        <FlexContents
          tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
          className={ClassNames.NegocioMainScrollContainer}
          ref={containerRef}
        >
          <MarginTopTwelve />
          <Contents />
          <Footer />
        </FlexContents>
      </div>
    </>
  );
}
