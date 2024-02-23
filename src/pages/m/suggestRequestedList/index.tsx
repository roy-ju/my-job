import { NextPageWithLayout } from '@/pages/_app';

import SuggestRequestedListMobile from '@/components/pages/SuggestRequestedList/SuggestRequestedListMobile';

const Page: NextPageWithLayout = () => <SuggestRequestedListMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
