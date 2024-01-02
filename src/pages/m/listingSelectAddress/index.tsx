import { NextPageWithLayout } from '@/pages/_app';

import ListingSelectAddress from '@/components/pages/mobile/ListingSelectAddress';

const Page: NextPageWithLayout = () => <ListingSelectAddress />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
