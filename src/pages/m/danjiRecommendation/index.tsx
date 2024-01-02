import { NextPageWithLayout } from '@/pages/_app';

import DanjiRecommendation from '@/components/pages/mobile/DanjiRecommendation';

const Page: NextPageWithLayout = () => <DanjiRecommendation />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
