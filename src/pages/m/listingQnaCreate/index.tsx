import { NextPageWithLayout } from '@/pages/_app';

import ListingQnaCreateForm from '@/components/pages/ListingQnaCreate/ListingQnaCreateMobile';

const Page: NextPageWithLayout = () => <ListingQnaCreateForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
