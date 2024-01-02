import { NextPageWithLayout } from '@/pages/_app';

import DanjiRecommendationUpdate from '@/components/pages/mobile/DanjiRecommendationUpdate';

const Page: NextPageWithLayout = () => <DanjiRecommendationUpdate />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
