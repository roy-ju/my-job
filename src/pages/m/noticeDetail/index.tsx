import { NextPageWithLayout } from '@/pages/_app';

import NoticeDetailWrraper from '@/components/pages/mobile/My/NoticeDetailWrraper';

const Page: NextPageWithLayout = () => <NoticeDetailWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
