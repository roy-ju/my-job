import { NextPageWithLayout } from '@/pages/_app';

import SuggestRecommendedList from '@/components/pages/mobile/SuggestRecommendedList';

const Page: NextPageWithLayout = () => <SuggestRecommendedList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
