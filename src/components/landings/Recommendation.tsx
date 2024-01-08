import tw from 'twin.macro';

import LandingFooter from './ui/LandingFooter';

import LandingHeader from './ui/LandingHeader';

import SectionTwo from './intro/IntroSectionThree';

import SectionOne from './recommendation/RecommendationSectionOne';

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
