import { NextPageWithLayout } from '@/pages/_app';

import ListingCheckList from '@/components/pages/ListingCheckList/ListingCheckListMobile';

const Page: NextPageWithLayout = () => <ListingCheckList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
