import { NextPageWithLayout } from '@/pages/_app';

import ListingCreateForm from '@/components/pages/mobile/ListingCreateForm';

const Page: NextPageWithLayout = () => <ListingCreateForm />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
