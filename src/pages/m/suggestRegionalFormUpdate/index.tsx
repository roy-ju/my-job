import { NextPageWithLayout } from '@/pages/_app';

import SuggestRegionalFormUpdate from '@/components/pages/mobile/SuggestRegionalFormUpdate';

const Page: NextPageWithLayout = () => <SuggestRegionalFormUpdate />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
