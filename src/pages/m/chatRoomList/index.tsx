import { ChatRoomList } from '@/components/pages/mobile';
import { NextPageWithLayout } from '@/pages/_app';

const Page: NextPageWithLayout = () => <ChatRoomList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;