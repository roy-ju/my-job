import { SuggestRecommendedList } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <SuggestRecommendedList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
