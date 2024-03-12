import { NextPageWithLayout } from '@/pages/_app';

import MyRegisteredListings from '@/components/pages/MyRegisteredListings/MyRegisteredListingsMobile';

const Page: NextPageWithLayout = () => <MyRegisteredListings />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
