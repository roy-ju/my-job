import { NextPageWithLayout } from '@/pages/_app';

import VerifyCi from '@/components/pages/mobile/VerifyCi';

import MobileContainer from '@/components/atoms/MobileContainer';

const Page: NextPageWithLayout = () => <VerifyCi />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
