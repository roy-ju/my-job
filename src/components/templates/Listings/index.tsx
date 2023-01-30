import { useState } from 'react';

type Props = {
  onClickGoBack: () => void;
  onClickListingDetail: () => void;
};

export default function Listings({
  onClickGoBack,
  onClickListingDetail,
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
      <p className="mb-4">매물목록페이지</p>
      <button
        type="button"
        className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        onClick={onClickListingDetail}
      >
        매물상세로 이동
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
