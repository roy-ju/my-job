import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback } from 'react';

type Props = {
  depth: number;
};

export default function ChatRoomPage({ depth }: Props) {
  const router = useRouter();

  const onClickGoBack = useCallback(() => {
    router.pop(depth);
  }, [router, depth]);

  return (
    <>
      <p>{depth}</p>
      <ChatRoom onClickGoBack={onClickGoBack} />
    </>
  );
}
