import { NextPageWithLayout } from '@/pages/_app';

import ReActivateMobile from '@/components/pages/ReActivate/ReActivateMobile';

const Page: NextPageWithLayout = () => <ReActivateMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
