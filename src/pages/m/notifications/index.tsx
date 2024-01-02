import { NextPageWithLayout } from '@/pages/_app';

import NotificationWrraper from '@/components/pages/mobile/My/NotificationWrraper';

const Page: NextPageWithLayout = () => <NotificationWrraper />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
