import { useState } from 'react';

type Props = {
  onClickGoBack: () => void;
  onClickChatRoom: () => void;
};

export default function ListingDetail({
  onClickGoBack,
  onClickChatRoom,
}: Props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        className="rounded-lg bg-blue-500 py-1 px-2 text-center text-white hover:bg-blue-700"
        type="button"
        onClick={onClickGoBack}
      >
        닫기
      </button>
      <p className="mb-4">매물상세페이지</p>
      <button
        className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        type="button"
        onClick={onClickChatRoom}
      >
        중개사 채팅방으로 이동
      </button>
      <br />
      <button
        type="button"
        className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </button>
    </div>
  );
}
