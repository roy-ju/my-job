import { NextPageWithLayout } from '@/pages/_app';

import RecommendGuide from '@/components/pages/mobile/RecommendGuide';

const Page: NextPageWithLayout = () => <RecommendGuide />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
