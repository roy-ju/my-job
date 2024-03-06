import { NextPageWithLayout } from '@/pages/_app';

import TradeProcess from '@/components/pages/TradeProcess/TradeProcessMobile';

const Page: NextPageWithLayout = () => <TradeProcess />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
