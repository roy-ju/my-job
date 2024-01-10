import { NextPageWithLayout } from '@/pages/_app';

import SuggestFormUpdateMobile from '@/components/pages/SuggestFormUpdate/SuggestFormUpdateMobile';

const Page: NextPageWithLayout = () => <SuggestFormUpdateMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
