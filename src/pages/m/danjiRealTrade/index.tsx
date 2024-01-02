import { NextPageWithLayout } from '@/pages/_app';

import RealTradeDetail from '@/components/pages/mobile/RealPriceDetail';

const Page: NextPageWithLayout = () => <RealTradeDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
