import { NextPageWithLayout } from '@/pages/_app';

import LocationTerms from '@/components/pages/LocationTerms/LocationTermsMobile';

const Page: NextPageWithLayout = () => <LocationTerms />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
