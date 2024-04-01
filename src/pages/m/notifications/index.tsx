import { NextPageWithLayout } from '@/pages/_app';

import Notifications from '@/components/pages/Notifications/NotificationsMobile';

const Page: NextPageWithLayout = () => <Notifications />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
