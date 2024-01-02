import { NextPageWithLayout } from '@/pages/_app';

import ServiceInfo from '@/components/pages/mobile/ServiceInfo';

const Page: NextPageWithLayout = () => <ServiceInfo />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
