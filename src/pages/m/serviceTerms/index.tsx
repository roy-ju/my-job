import { NextPageWithLayout } from '@/pages/_app';

import ServiceTerms from '@/components/pages/ServiceTerms/ServiceTermsMobile';

const Page: NextPageWithLayout = () => <ServiceTerms />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
