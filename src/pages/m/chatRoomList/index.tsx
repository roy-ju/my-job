import { NextPageWithLayout } from '@/pages/_app';

import ChatRoomList from '@/components/pages/ChatRoomList/ChatRoomListMobile';

const Page: NextPageWithLayout = () => <ChatRoomList />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
