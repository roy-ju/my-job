import { Shared } from '@/components/atoms';
import { useState } from 'react';

type Props = {
  depth: number;
  listingID: number;
  onClickChatRoom: () => void;
  onClickReport: () => void;
};

export default function ListingDetail({
  depth,
  listingID,
  onClickChatRoom,
  onClickReport,
}: Props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="mb-4">매물상세페이지{listingID}</p>
      <button
        className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        type="button"
        onClick={onClickChatRoom}
      >
        중개사 채팅방으로 이동
      </button>
      <br />
      <button
        className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        type="button"
        onClick={onClickReport}
      >
        신고하기
      </button>
      <br />
      <button
        type="button"
        className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </button>
      <Shared componentKey="shared1" depth={depth}>
        <p>공통정보</p>
      </Shared>
      <p>고유정보</p>
    </div>
  );
}
