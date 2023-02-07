import { Home } from '@/components/pages';
import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => (
  <div tw="absolute top-0 left-0 z-10 bg-white p-2 shadow-2xl">
    <Home depth={0} />
  </div>
);

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default Page;
