import { NextPageWithLayout } from '@/pages/_app';

import ChatRoom from '@/components/pages/ChatRoom/ChatRoomMobile';

const Page: NextPageWithLayout = () => <ChatRoom />;

Page.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default Page;
