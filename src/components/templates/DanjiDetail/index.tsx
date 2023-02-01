import { Shared } from '@/components/atoms';

type Props = {
  depth: number;
  onClickListingDetail: () => void;
};

export default function DanjiDetail({ depth, onClickListingDetail }: Props) {
  return (
    <div>
      <p>단지상세</p>
      <div className="flex flex-col gap-y-1">
        <button
          className="rounded-lg bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700"
          type="button"
          onClick={onClickListingDetail}
        >
          메물상세로 이동 id 1
        </button>
      </div>
      <Shared componentKey="shared1" depth={depth}>
        <p>공통정보</p>
      </Shared>
      <p>고유정보</p>
    </div>
  );
}
