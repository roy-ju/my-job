import { Dropdown } from '@/components/molecules';
import Check from '@/assets/icons/check.svg';

interface RentTermProps {
  onClick?: () => void;
}

export default function RentTerm({ onClick: handleClick }: RentTermProps) {
  return (
    <div>
      <div>
        <div tw="flex justify-between mb-3">
          <div tw="text-b1 leading-none font-bold">임대 기간</div>
          <button type="button" onClick={handleClick} tw="flex gap-2.5 py-2 px-4 bg-gray-200 rounded-lg">
            <span tw="text-gray-600">
              <Check />
            </span>
            <span tw="text-b2 leading-none">협의 불가</span>
          </button>
        </div>
        <div tw="flex gap-3">
          <Dropdown tw="flex-1 min-w-0 text-black" variant="outlined" value="2년" />
          <Dropdown tw="flex-1 min-w-0 text-black" variant="outlined" value="0개월" />
        </div>
      </div>
    </div>
  );
}
