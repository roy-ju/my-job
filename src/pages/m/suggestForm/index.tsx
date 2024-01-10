import { NextPageWithLayout } from '@/pages/_app';

import SuggestFormMobile from '@/components/pages/SuggestForm/SuggestFormMobile';

const Page: NextPageWithLayout = () => <SuggestFormMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
