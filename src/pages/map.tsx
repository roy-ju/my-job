import Home from '@/components/pages/pc/Home';
import { MapLayout } from '@/layouts';
import AppConfig from '@/config';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <meta property="og:title" content={AppConfig.title} />
      <meta property="og:description" content={AppConfig.description} />
      <meta property="og:image" content={AppConfig.ogImagePath} />
    </Head>
    <Home />
  </>
);

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default Page;
