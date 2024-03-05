import { NextPageWithLayout } from '@/pages/_app';

import NoticeDetail from '@/components/pages/NoticeDetail/NoticeDetailMobile';

const Page: NextPageWithLayout = () => <NoticeDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
