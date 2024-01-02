import { NextPageWithLayout } from '@/pages/_app';

import ListingQnaCreateForm from '@/components/pages/mobile/ListingQnaCreateForm';

const Page: NextPageWithLayout = () => <ListingQnaCreateForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
