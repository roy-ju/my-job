import { MobMy } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <MobMy />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
