import { useState } from 'react';

type Props = {
  onClickListingDetail: (id: number) => void;
};

export default function Listings({ onClickListingDetail }: Props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>매물목록페이지</p>
      <button
        type="button"
        tw="my-2 rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        onClick={() => setCount((prev) => prev + 1)}
      >
        {count}
      </button>
      <div tw="flex flex-col gap-y-1">
        <button
          type="button"
          tw="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
          onClick={() => onClickListingDetail(1)}
        >
          매물상세 1
        </button>
        <button
          type="button"
          tw="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
          onClick={() => onClickListingDetail(2)}
        >
          매물상세 2
        </button>
        <button
          type="button"
          tw="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
          onClick={() => onClickListingDetail(3)}
        >
          매물상세 3
        </button>
      </div>
    </div>
  );
}
