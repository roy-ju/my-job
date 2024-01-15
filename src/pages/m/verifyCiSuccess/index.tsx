import { NextPageWithLayout } from '@/pages/_app';

import VerifyCiSuccess from '@/components/pages/mobile/VerifyCiSuccess';

const Page: NextPageWithLayout = () => <VerifyCiSuccess />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
