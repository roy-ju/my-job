import { NextPageWithLayout } from '@/pages/_app';

import SuggestRegionalForm from '@/components/pages/SuggestRegionalForm';

const Page: NextPageWithLayout = () => <SuggestRegionalForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
