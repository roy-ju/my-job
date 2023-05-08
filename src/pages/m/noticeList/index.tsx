import { NextPageWithLayout } from '@/pages/_app';
import { NoticeListWrraper } from '@/components/pages/mobile';

const Page: NextPageWithLayout = () => <NoticeListWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
