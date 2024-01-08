import { useState, useEffect, useRef } from 'react';

import tw from 'twin.macro';

import LandingFooter from './ui/LandingFooter';

import LandingHeader from './ui/LandingHeader';

import SectionOne from './intro/IntroSectionOne';

import SectionTwo from './intro/IntroSectionTwo';

import SectionThree from './intro/IntroSectionThree';

import SectionFour from './intro/IntroSectionFour';

import SectionSeven from './intro/IntroSectionSeven';

import SectionEight from './intro/IntroSectionEight';

import SectionSix from './intro/IntroSectionSix';

import SectionFive from './intro/IntroSectionFive';

const Layout = tw.div`absolute inset-0 overflow-auto`;
const Main = tw.main``;

export default function Intro() {
  const conatinerRef = useRef<HTMLDivElement | null>(null);
  const [isMobileSize, setIsMobileSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      setIsMobileSize(innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout ref={conatinerRef}>
      <LandingHeader />
      <Main>
        <SectionOne isMobileSize={isMobileSize} />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive isMobileSize={isMobileSize} />
        <SectionSix scrollContainerRef={conatinerRef} />
        <SectionSeven />
        <SectionEight />
      </Main>
      <LandingFooter />
    </Layout>
  );
}
