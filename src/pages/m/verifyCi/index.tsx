import { NextPageWithLayout } from '@/pages/_app';

import VerifyCiMobile from '@/components/pages/VerifyCi/VerifyCiMobile';

// import VerifyCi from '@/components/pages/mobile/VerifyCi';

const Page: NextPageWithLayout = () => <VerifyCiMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
