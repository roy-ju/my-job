import { NextPageWithLayout } from '@/pages/_app';

import ServiceInfo from '@/components/pages/ServiceInfo/ServiceInfoMobile';

const Page: NextPageWithLayout = () => <ServiceInfo />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
