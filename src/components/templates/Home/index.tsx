type Props = {
  onClickMyPage: () => void;
  onClickListingDetail: () => void;
  onClickListings: () => void;
  onClickDanjiDetail: () => void;
  onClickLoginWithKakao: () => void;
};

export default function Home({
  onClickMyPage,
  onClickListingDetail,
  onClickListings,
  onClickDanjiDetail,
  onClickLoginWithKakao,
}: Props) {
  return (
    <div>
      <p className="mb-4">홈페이지</p>
      <div className="flex flex-col gap-y-1">
        <button
          className="rounded-lg bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700"
          type="button"
          onClick={onClickLoginWithKakao}
        >
          카카오 로그인
        </button>
        <button
          className="rounded-lg bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700"
          type="button"
          onClick={onClickMyPage}
        >
          마이페이지로 이동
        </button>
        <button
          className="rounded-lg bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700"
          type="button"
          onClick={onClickListingDetail}
        >
          매물상세페이지로 이동
        </button>
        <button
          className="rounded-lg bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700"
          type="button"
          onClick={onClickListings}
        >
          매물목록으로 이동
        </button>
        <button
          className="rounded-lg bg-blue-500 py-2 px-4 text-center text-white hover:bg-blue-700"
          type="button"
          onClick={onClickDanjiDetail}
        >
          단지상세로 이동
        </button>
      </div>
    </div>
  );
}
