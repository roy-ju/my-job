import { NextPageWithLayout } from '@/pages/_app';

import MapListingList from '@/components/pages/mobile/MapListingList';

const Page: NextPageWithLayout = () => <MapListingList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
