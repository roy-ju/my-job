import { NextPageWithLayout } from '@/pages/_app';

import MyAddressDetailMobile from '@/components/pages/MyAddressDetail/MyAddressDetailMobile';

const Page: NextPageWithLayout = () => <MyAddressDetailMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
