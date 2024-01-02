import { NextPageWithLayout } from '@/pages/_app';

import MyAddressVerfiyResult from '@/components/pages/mobile/MyAddressVerfiyResult';

const Page: NextPageWithLayout = () => <MyAddressVerfiyResult />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
