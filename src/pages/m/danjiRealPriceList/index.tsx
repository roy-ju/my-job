import DanjiRealPriceListAll from '@/components/pages/mobile/DanjiRealRriceListAll';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <DanjiRealPriceListAll />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
