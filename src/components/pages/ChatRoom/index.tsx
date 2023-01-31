import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback } from 'react';

type Props = {
  depth: number;
};

export default function ChatRoomPage({ depth }: Props) {
  const router = useRouter();

  const onClickGoBack = useCallback(() => {
    router.pop(depth - 1);
  }, [router, depth]);

  return (
    <>
      <p>{depth}</p>
      <button type="button" onClick={() => router.replace('', 0)}>
        click me
      </button>
      <ChatRoom onClickGoBack={onClickGoBack} />
    </>
  );
}
