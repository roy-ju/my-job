type Props = {
  onClickListingDetail: () => void;
};

export default function DanjiDetail({ onClickListingDetail }: Props) {
  return (
    <div>
      <p>단지상세</p>
      <div tw="flex flex-col gap-y-1">
        <button
          tw="rounded-lg bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700"
          type="button"
          onClick={onClickListingDetail}
        >
          메물상세로 이동 id 1
        </button>
      </div>
    </div>
  );
}
