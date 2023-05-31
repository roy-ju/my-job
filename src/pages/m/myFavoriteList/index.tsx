import { MyFavoriteList } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <MyFavoriteList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
