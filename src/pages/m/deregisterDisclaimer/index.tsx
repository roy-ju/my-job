import { NextPageWithLayout } from '@/pages/_app';

import DeregisterDisclaimerWrraper from '@/components/pages/mobile/My/DeregisterDisclaimerWrraper';

const Page: NextPageWithLayout = () => <DeregisterDisclaimerWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
