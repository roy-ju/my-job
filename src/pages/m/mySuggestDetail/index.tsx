import { NextPageWithLayout } from '@/pages/_app';

import MySuggestDetailMobile from '@/components/pages/MySuggestDetail/MySuggestDetailMobile';

const Page: NextPageWithLayout = () => <MySuggestDetailMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
