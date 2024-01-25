import { NextPageWithLayout } from '@/pages/_app';

import VerifyCiSuccessMobile from '@/components/pages/VerifyCiSuccess/VerifyCiSuccessMobile';

// import VerifyCiSuccess from '@/components/pages/mobile/VerifyCiSuccess';

const Page: NextPageWithLayout = () => <VerifyCiSuccessMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
