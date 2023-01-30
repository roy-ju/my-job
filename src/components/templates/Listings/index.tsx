import { useState } from 'react';

type Props = {
  onClickGoBack: () => void;
  onClickListingDetail: (id: number) => void;
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
      <p>매물목록페이지</p>
      <button
        type="button"
        className="my-2 rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </button>
      <div className="flex flex-col gap-y-1">
        <button
          type="button"
          className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
          onClick={() => onClickListingDetail(1)}
        >
          매물상세 1
        </button>
        <button
          type="button"
          className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
          onClick={() => onClickListingDetail(2)}
        >
          매물상세 2
        </button>
        <button
          type="button"
          className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
          onClick={() => onClickListingDetail(3)}
        >
          매물상세 3
        </button>
      </div>
    </div>
  );
}
