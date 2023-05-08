import { DetailWrraper } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <DetailWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
