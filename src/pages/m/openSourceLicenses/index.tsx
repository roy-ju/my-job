import { OpenSourceLicenses } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <OpenSourceLicenses />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
