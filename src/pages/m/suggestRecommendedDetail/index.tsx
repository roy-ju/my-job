import { NextPageWithLayout } from '@/pages/_app';

import SuggestRecommendedDetail from '@/components/pages/mobile/SuggestRecommendedDetail';

const Page: NextPageWithLayout = () => <SuggestRecommendedDetail />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
