import { NextPageWithLayout } from '@/pages/_app';

import DanjiRealPriceListAll from '@/components/pages/mobile/DanjiRealRriceListAll';

const Page: NextPageWithLayout = () => <DanjiRealPriceListAll />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
