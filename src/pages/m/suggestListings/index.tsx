import { NextPageWithLayout } from '@/pages/_app';

import SuggestListingsMobile from '@/components/pages/SuggestListings/SuggestListingsMobile';

const Page: NextPageWithLayout = () => <SuggestListingsMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
