import { NextPageWithLayout } from '@/pages/_app';

import RealPriceListWrraper from '@/components/pages/mobile/My/RealPriceListWrraper';

const Page: NextPageWithLayout = () => <RealPriceListWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
