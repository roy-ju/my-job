import { NextPageWithLayout } from '@/pages/_app';

import DeregisterWrraper from '@/components/pages/mobile/My/DeregisterWrraper';

const Page: NextPageWithLayout = () => <DeregisterWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
