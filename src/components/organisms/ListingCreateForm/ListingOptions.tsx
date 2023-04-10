import { Checkbox, Label } from '@/components/atoms';

interface ListingOptionsProps {
  handleCheckBoxChange?: () => void;
}

export default function ListingOptions({ handleCheckBoxChange }: ListingOptionsProps) {
  return (
    <div>
      <div tw="text-b1 leading-none font-bold">매물 옵션</div>
      <div tw="mt-[0.6875rem] text-info text-gray-700">- 복수선택 가능합니다.</div>
      <div tw="mt-4 grid grid-cols-3">
        <Label label="베란다 확장" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="2년 내 올수리" control={<Checkbox onChange={handleCheckBoxChange} />} />
      </div>
    </div>
  );
}
