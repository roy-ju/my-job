import { NextPageWithLayout } from '@/pages/_app';

import VerifyCiMobile from '@/components/pages/VerifyCiSuccess/VerifyCiSuccessMobile';

// import VerifyCiSuccess from '@/components/pages/mobile/VerifyCiSuccess';

const Page: NextPageWithLayout = () => <VerifyCiMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
