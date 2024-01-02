import { NextPageWithLayout } from '@/pages/_app';

import SuggestListingForm from '@/components/pages/mobile/SuggestListingForm';

const Page: NextPageWithLayout = () => <SuggestListingForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
