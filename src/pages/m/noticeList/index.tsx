import { NextPageWithLayout } from '@/pages/_app';

import NoticeList from '@/components/pages/NoticeList/NoticeListMobile';

const Page: NextPageWithLayout = () => <NoticeList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
