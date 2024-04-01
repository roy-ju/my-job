import { NextPageWithLayout } from '@/pages/_app';

import MyAddressVerifyingMobile from '@/components/pages/MyAddressVerifying/MyAddressVerifyingMobile';

const Page: NextPageWithLayout = () => <MyAddressVerifyingMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
