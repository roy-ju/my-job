import { NextPageWithLayout } from '@/pages/_app';

import SuggestDetailMobile from '@/components/pages/SuggestDetail/SuggestDetailMobile';

const Page: NextPageWithLayout = () => <SuggestDetailMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
