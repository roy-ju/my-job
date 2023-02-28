import Check from '@/assets/icons/check.svg';

type Props = {
  value?: any;
  onClick: (v: any) => void;
  currentValue: any[];
};

function Checkbox({ value, currentValue, onClick }: Props) {
  return (
    <button
      type="button"
      tw="flex items-center gap-2"
      onClick={() => {
        onClick(value);
      }}
    >
      {currentValue.indexOf(value) !== -1 ? (
        <Check />
      ) : (
        <div tw="w-[1.25rem] h-[1.25rem] rounded-[0.25rem]  bg-white border-gray-1000 cursor-pointer border-[1px]" />
      )}
      <span>{value}</span>
    </button>
  );
}

export default Checkbox;
