import { Recommendation as RecommendationTemplate } from '@/components/templates/landings';

import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <RecommendationTemplate />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
