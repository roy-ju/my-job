import { NextPageWithLayout } from '@/pages/_app';

import ListingCreateChooseAgent from '@/components/pages/mobile/ListingCreateChooseAgent';

const Page: NextPageWithLayout = () => <ListingCreateChooseAgent />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
