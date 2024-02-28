import { NextPageWithLayout } from '@/pages/_app';

import DanjiListings from '@/components/pages/DanjiListings/DanjiListingsMobile';

const Page: NextPageWithLayout = () => <DanjiListings />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
