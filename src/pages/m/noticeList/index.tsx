import { NextPageWithLayout } from '@/pages/_app';

import NoticeListWrraper from '@/components/pages/mobile/My/NoticeListWrraper';

const Page: NextPageWithLayout = () => <NoticeListWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
