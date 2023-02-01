import { Home } from '@/components/pages';
import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => (
  <div className="absolute top-0 left-0 z-10 bg-white p-2 shadow-lg">
    <Home depth={0} />
  </div>
);

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default Page;
