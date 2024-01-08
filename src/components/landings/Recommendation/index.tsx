import React from 'react';
import tw from 'twin.macro';
import LandingFooter from '../LandingFooter';
import LandingHeader from '../LandingHeader';
import SectionTwo from '../Intro/IntroSectionThree';
import SectionOne from './RecommendationSectionOne';

const Layout = tw.div`absolute inset-0 overflow-auto`;
const Main = tw.main``;

export default function Recommendation() {
  return (
    <Layout>
      <LandingHeader />
      <Main>
        <SectionOne />
        <SectionTwo recommend />
      </Main>
      <LandingFooter />
    </Layout>
  );
}
