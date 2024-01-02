import { NextPageWithLayout } from '@/pages/_app';

import RealPriceDetail from '@/components/pages/mobile/RealPriceDetail';

const Page: NextPageWithLayout = () => <RealPriceDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
