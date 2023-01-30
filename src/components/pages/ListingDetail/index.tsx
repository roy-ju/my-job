import { ListingDetail } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback } from 'react';

type Props = {
  depth: number;
  listingID: number;
};

export default function ListingDetailPage({ depth, listingID }: Props) {
  const router = useRouter();

  const onClickGoBack = useCallback(() => {
    router.pop(depth);
  }, [router, depth]);

  const onClickChatRoom = useCallback(() => {
    router.push('chatRoom');
  }, [router]);

  return (
    <>
      <p>{depth}</p>
      <ListingDetail
        listingID={listingID}
        onClickGoBack={onClickGoBack}
        onClickChatRoom={onClickChatRoom}
      />
    </>
  );
}
