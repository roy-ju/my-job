import { NextPageWithLayout } from '@/pages/_app';

import { MobileContainer } from '@/components/atoms';

import SuggestForm from '@/components/suggest/SuggestForm';

const Page: NextPageWithLayout = () => <SuggestForm />;

Page.getLayout = function getLayout(page) {
  return <MobileContainer>{page}</MobileContainer>;
};

export default Page;
