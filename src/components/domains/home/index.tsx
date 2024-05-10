import { useRef } from 'react';

// import dynamic from 'next/dynamic';

import { MarginTopTwelve } from '@/components/atoms/Margin';

import FlexContents from '@/components/atoms/FlexContents';

import Container from '@/components/atoms/Container';

import ClassNames from '@/constants/classNames';

import useSaveScrollLocation from '@/hooks/useSaveScrollLocation';

import useRestoreScrollPosition from '@/hooks/useScrollResotoration';

// import useScroll from '@/hooks/useScroll';

// import useCheckPlatform from '@/hooks/useCheckPlatform';

import Header from './Header';

import Contents from './Contents';

import Footer from './Footer';

// const EventPopup = dynamic(() => import('@/components/organisms/popups/EventPopup'), { ssr: false });

// const BandBanner = dynamic(() => import('@/components/organisms/global/BandBanner'), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // const { platform } = useCheckPlatform();

  // const [scrolling, setIsScrolling] = useState(false);

  useSaveScrollLocation(containerRef, 'home');

  useRestoreScrollPosition(containerRef, 'home');

  // useScroll(containerRef, ({ scrollY }) => {
  //   if (scrollY > 0) {
  //     setIsScrolling(true);
  //   } else {
  //     setIsScrolling(false);
  //   }
  // });

  return (
    <>
      <Container>
        <Header />
        {/* <BandBanner scrolling={scrolling} /> */}
        <FlexContents
          tw="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
          className={ClassNames.NegocioMainScrollContainer}
          ref={containerRef}
        >
          <MarginTopTwelve />
          <Contents />
          <Footer />
        </FlexContents>
      </Container>
      {/* <EventPopup nDays={1} platform={platform} /> */}
    </>
  );
}
