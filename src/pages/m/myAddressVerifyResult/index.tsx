import { NextPageWithLayout } from '@/pages/_app';

import MyAddressVerfiyResult from '@/components/pages/MyAddressVerifyResult/MyAddressVerifyResultMobile';

const Page: NextPageWithLayout = () => <MyAddressVerfiyResult />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
