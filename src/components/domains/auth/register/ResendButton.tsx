type ReSendButtonProps = {
  handleClick?: () => void;
};

export default function ReSendButton({ handleClick }: ReSendButtonProps) {
  return (
    <button
      type="button"
      tw="ml-auto block mt-4 text-body_01 text-gray-700 [text-decoration-line: underline]"
      onClick={handleClick}
    >
      인증번호 재발송
    </button>
  );
}
