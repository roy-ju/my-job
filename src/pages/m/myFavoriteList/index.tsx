import { NextPageWithLayout } from '@/pages/_app';

import MyFavoriteList from '@/components/pages/MyFavoriteList/MyFavoriteListMobile';

const Page: NextPageWithLayout = () => <MyFavoriteList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
