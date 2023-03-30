import Home from '@/components/pages/pc/Home';
import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => <Home />;

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default Page;
