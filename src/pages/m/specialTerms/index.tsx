import { NextPageWithLayout } from '@/pages/_app';

import SpecialTerms from '@/components/pages/SpecialTerms/SpecialTermsMobile';

const Page: NextPageWithLayout = () => <SpecialTerms />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
