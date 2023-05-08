import { NegoPointWrraper } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <NegoPointWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
