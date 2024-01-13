import { NextPageWithLayout } from '@/pages/_app';

import VerifyCiSuccess from '@/components/pages/mobile/VerifyCiSuccess';

import MobileContainer from '@/components/atoms/MobileContainer';

const Page: NextPageWithLayout = () => <VerifyCiSuccess />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
