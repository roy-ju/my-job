import { NextPageWithLayout } from '@/pages/_app';

import DanjiRecommendationSummary from '@/components/pages/mobile/DanjiRecommendationSummary';

const Page: NextPageWithLayout = () => <DanjiRecommendationSummary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
