import { NextPageWithLayout } from '@/pages/_app';

import MyAddressMobile from '@/components/pages/MyAddress/MyAddressMobile';
// import AddressWrraper from '@/components/pages/mobile/My/AddressWrraper';

const Page: NextPageWithLayout = () => <MyAddressMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
