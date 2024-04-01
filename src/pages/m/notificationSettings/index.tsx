import { NextPageWithLayout } from '@/pages/_app';

import NotificationSettings from '@/components/pages/NotificationSettings/NotificationSettingsMobile';

const Page: NextPageWithLayout = () => <NotificationSettings />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
