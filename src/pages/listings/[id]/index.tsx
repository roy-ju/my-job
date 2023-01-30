import { Panel } from '@/components/atoms';
import { ListingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { NextPageWithLayout } from '@/pages/_app';
import { useCallback } from 'react';
import ListingsPage from '..';

const ListingDetailPage: NextPageWithLayout = ({ children }) => {
  const router = useRouter();

  const onClickGoBack = useCallback(() => {
    delete router.query.id;
    router.navigate({ pathname: '../listings', query: router.query });
  }, [router]);

  const onClickChatRoom = useCallback(() => {
    if (!router.hasPathname('chatroom')) {
      router.navigate({
        pathname: '[id]/chatroom',
        query: router.query,
      });
    }
  }, [router]);

  return (
    <>
      <Panel>
        <ListingDetail
          onClickGoBack={onClickGoBack}
          onClickChatRoom={onClickChatRoom}
        />
      </Panel>
      {children}
    </>
  );
};

ListingDetailPage.getLayout = function getLayout(page) {
  return ListingsPage.getLayout?.(<ListingsPage>{page}</ListingsPage>);
};

export default ListingDetailPage;
