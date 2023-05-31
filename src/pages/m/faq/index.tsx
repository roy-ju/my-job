import { NextPageWithLayout } from '@/pages/_app';
import { FaqWrraper } from '@/components/pages/mobile';

const Page: NextPageWithLayout = () => <FaqWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
