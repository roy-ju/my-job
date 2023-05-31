import { ChatRoom } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <ChatRoom />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
