import { RecommendationForm as RecommendationFormTemplate } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <RecommendationFormTemplate />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
