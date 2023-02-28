type Props = {
  /** 버튼 항목 이름 */
  label: string;
  /** 현재 선택된 항목 */
  currentValue: string | number | null;
  /** 클릭 시 호출할 함수 */
  onClick: (v: any) => void;
};

export function RadioButton({ label, currentValue, onClick }: Props) {
  return (
    <button
      type="button"
      tw="flex items-center gap-2"
      onClick={() => {
        if (label === currentValue) {
          onClick(null);
        } else {
          onClick(label);
        }
      }}
    >
      {currentValue === label ? (
        <div tw="w-5 h-5 rounded-full border-[6px] border-gray-1000" />
      ) : (
        <div tw="w-5 h-5 rounded-full border-[1px] border-gray-300" />
      )}

      <span>{label}</span>
    </button>
  );
}
