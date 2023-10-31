import SuggestRegionalForm from '@/components/pages/SuggestRegionalForm';

import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <SuggestRegionalForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
