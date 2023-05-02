import { SuggestRegionalSummary } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <SuggestRegionalSummary />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
