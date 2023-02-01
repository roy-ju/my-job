import { ChatRoom } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import { useCallback } from 'react';

type Props = {
  depth: number;
};

export default function ChatRoomPage({ depth }: Props) {
  const router = useRouter(depth);

  const onClickGoBack = useCallback(() => {
    router.pop();
  }, [router]);

  return (
    <>
      <p>{depth}</p>
      {depth === 2 && (
        <button
          className="absolute top-[10px] left-[750px] z-[200] bg-gray-800 p-2 text-white"
          type="button"
          onClick={onClickGoBack}
        >
          닫기
        </button>
      )}
      <ChatRoom />
    </>
  );
}
