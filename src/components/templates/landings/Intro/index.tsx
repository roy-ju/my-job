import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import LandingFooter from '../LandingFooter';
import LandingHeader from '../LandingHeader';
import SectionOne from './IntroSectionOne';
import SectionTwo from './IntroSectionTwo';
import SectionThree from './IntroSectionThree';
import SectionFour from './IntroSectionFour';
import SectionSeven from './IntroSectionSeven';
import SectionEight from './IntroSectionEight';
import SectionSix from './IntroSectionSix';
import SectionFive from './IntroSectionFive';

const Layout = tw.div`absolute inset-0 overflow-auto`;
const Main = tw.main``;

export default function Intro() {
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
    <Layout>
      <LandingHeader />
      <Main>
        <SectionOne isMobileSize={isMobileSize} />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive isMobileSize={isMobileSize} />
        <SectionSix />
        <SectionSeven />
        <SectionEight />
      </Main>
      <LandingFooter />
    </Layout>
  );
}
