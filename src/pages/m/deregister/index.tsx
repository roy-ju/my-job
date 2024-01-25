import { NextPageWithLayout } from '@/pages/_app';

import DeregisterMobile from '@/components/pages/Deregister/DeregisterMobile';

// import DeregisterWrraper from '@/components/pages/mobile/My/DeregisterWrraper';

const Page: NextPageWithLayout = () => <DeregisterMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
