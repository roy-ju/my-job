import { NextPageWithLayout } from '@/pages/_app';

import SuggestDetail from '@/components/pages/mobile/SuggestDetail';

const Page: NextPageWithLayout = () => <SuggestDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
