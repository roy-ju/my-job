import { NotificationSettingsWrraper } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <NotificationSettingsWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
