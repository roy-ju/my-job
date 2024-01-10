import { NextPageWithLayout } from '@/pages/_app';

import SuggestGuideMobile from '@/components/pages/SuggestGuide/SuggestGuideMobile';

const Page: NextPageWithLayout = () => <SuggestGuideMobile />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
