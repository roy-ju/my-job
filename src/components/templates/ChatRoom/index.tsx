type Props = {
  onClickGoBack: () => void;
};

export default function ChatRoom({ onClickGoBack }: Props) {
  return (
    <div>
      <button
        className="rounded-lg bg-blue-500 py-1 px-2 text-center text-white hover:bg-blue-700"
        type="button"
        onClick={onClickGoBack}
      >
        닫기
      </button>
      <p>중개사채팅방</p>
    </div>
  );
}
