import RecommendationForm from '@/components/pages/mobile/RecommendationForm';

import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <RecommendationForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
