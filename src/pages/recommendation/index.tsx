import Head from 'next/head';

import AppConfig from '@/config';

import Recommendation from '@/components/domains/landings/Recommendation';

import { NextPageWithLayout } from '../_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <title>{`매물 추천받기 | ${AppConfig.title}`}</title>
      <meta
        name="description"
        content={`${AppConfig.description}, 아파트, 오피스텔, 단지, 실거래가, 시세, 매물, 호가`}
      />
      <meta
        name="keywords"
        content="네고시오, 부동산, 아파트 실거래가, 아파트 시세, 오피스텔 실거래가, 오피스텔 시세, 교통, 단지, 실거래가, 시세, 호가, 매매, 전세, 월세"
      />
      <meta property="og:title" content={`매물 추천받기 | ${AppConfig.title}`} />
      <meta property="og:description" content={AppConfig.description} />
      <meta property="og:image" content={AppConfig.ogImagePath} />
    </Head>
    <Recommendation />
  </>
);

export default Page;
