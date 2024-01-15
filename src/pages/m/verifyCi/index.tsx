import { NextPageWithLayout } from '@/pages/_app';

import VerifyCi from '@/components/pages/mobile/VerifyCi';

const Page: NextPageWithLayout = () => <VerifyCi />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
