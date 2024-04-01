import { NextPageWithLayout } from '@/pages/_app';

import SubHome from '@/components/pages/SubHome/SubHomeMobile';

const Page: NextPageWithLayout = () => <SubHome />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
