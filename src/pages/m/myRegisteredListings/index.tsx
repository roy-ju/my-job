import { NextPageWithLayout } from '@/pages/_app';

import MyRegisteredListings from '@/components/pages/mobile/MyRegisteredListings';

const Page: NextPageWithLayout = () => <MyRegisteredListings />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
