import { NextPageWithLayout } from '@/pages/_app';

import ListingManage from '@/components/pages/mobile/ListingManage';

const Page: NextPageWithLayout = () => <ListingManage />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
