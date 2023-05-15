import { MobHog } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <MobHog />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
