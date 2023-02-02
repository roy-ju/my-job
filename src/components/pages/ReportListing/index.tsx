import { useRouter } from '@/hooks/utils';
import { memo, useCallback } from 'react';

type Props = {
  depth: number;
};

export default memo(({ depth }: Props) => {
  const router = useRouter(depth);

  const onClickGoBack = useCallback(() => {
    router.pop();
  }, [router]);

  return (
    <>
      <p>{depth}</p>
      <button
        className="absolute top-[10px] left-[750px] z-[200] bg-gray-800 p-2 text-white"
        type="button"
        onClick={onClickGoBack}
      >
        닫기
      </button>
      <p>신고하기</p>
    </>
  );
});
