import { MapLayout } from '@/layouts';
import { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => <></>;

Page.getLayout = function getLayout(page) {
  return <MapLayout>{page}</MapLayout>;
};

export default Page;
