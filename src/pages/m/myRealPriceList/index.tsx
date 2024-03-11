import { NextPageWithLayout } from '@/pages/_app';

import MyRealpriceList from '@/components/pages/MyRealpriceList/MyRealpriceListMobile';

const Page: NextPageWithLayout = () => <MyRealpriceList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
