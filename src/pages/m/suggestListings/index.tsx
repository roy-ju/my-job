import { NextPageWithLayout } from '@/pages/_app';

import SuggestListings from '@/components/pages/mobile/SuggestListings';

const Page: NextPageWithLayout = () => <SuggestListings />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
