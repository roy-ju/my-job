// import Home from '@/components/pages/pc/Home';
// import { MapLayout } from '@/layouts';
import AppConfig from '@/config';
import Maintenence from '@/layouts/Maintenence';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => (
  <>
    <Head>
      <meta name="description" content={AppConfig.description} />
      <meta property="og:title" content={AppConfig.title} />
      <meta property="og:description" content={AppConfig.description} />
      <meta property="og:image" content={AppConfig.ogImagePath} />
    </Head>
    {/* <Home /> */}
  </>
);

// Page.getLayout = function getLayout(page) {
//   return <MapLayout>{page}</MapLayout>;
// };

Page.getLayout = function getLayout() {
  return <Maintenence />;
};

export default Page;
