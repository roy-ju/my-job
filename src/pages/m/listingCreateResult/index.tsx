import { NextPageWithLayout } from '@/pages/_app';

import ListingCreateResult from '@/components/pages/ListingCreateResult/ListingCreateResultMobile';

const Page: NextPageWithLayout = () => <ListingCreateResult />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
