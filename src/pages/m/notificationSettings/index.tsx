import { NextPageWithLayout } from '@/pages/_app';

import NotificationSettingsWrraper from '@/components/pages/mobile/My/NotificationSettingsWrraper';

const Page: NextPageWithLayout = () => <NotificationSettingsWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
