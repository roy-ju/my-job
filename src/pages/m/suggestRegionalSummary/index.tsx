import { NextPageWithLayout } from '@/pages/_app';

import SuggestRegionalSummary from '@/components/pages/SuggestRegionalSummary';

const Page: NextPageWithLayout = () => <SuggestRegionalSummary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
