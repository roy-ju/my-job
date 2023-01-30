import { Panel } from '@/components/atoms';
import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { useCallback } from 'react';
import ListingsPage from '..';

const ChatRoomPage: NextPageWithLayout = ({ children }) => {
  const router = useRouter();

  const onClickGoBack = useCallback(() => {
    router.navigate({ pathname: './', query: router.query });
  }, [router]);

  return (
    <>
      <Panel>
        <ChatRoom onClickGoBack={onClickGoBack} />
      </Panel>
      {children}
    </>
  );
};

ChatRoomPage.getLayout = function getLayout(page) {
  return ListingsPage.getLayout?.(<ListingsPage>{page}</ListingsPage>);
};

export default ChatRoomPage;
