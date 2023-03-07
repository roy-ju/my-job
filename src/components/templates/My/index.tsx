interface Props {
  onClickGoBack: () => void;
}

export default function My({ onClickGoBack }: Props) {
  return (
    <div>
      <button
        tw="rounded-lg bg-blue-500 py-1 px-2 text-center text-white hover:bg-blue-700"
        type="button"
        onClick={onClickGoBack}
      >
        닫기
      </button>
      <p tw="mb-4">마이페이지</p>
    </div>
  );
}
