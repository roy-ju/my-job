import { Checkbox, Label } from '@/components/atoms';

interface ExtraOptionsProps {
  handleCheckBoxChange?: () => void;
}

export default function ExtraOptions({ handleCheckBoxChange }: ExtraOptionsProps) {
  return (
    <div>
      <div tw="text-b1 leading-none font-bold">매물 옵션</div>
      <div tw="mt-[0.6875rem] text-info text-gray-700">- 복수선택 가능합니다.</div>
      <div tw="mt-4 grid grid-cols-3  gap-[1.6875rem]">
        <Label label="엘리베이터" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="에어컨" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="냉장고" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="전자레인지" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="인덕션" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="세탁기" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="건조기" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="옷장" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="도어락" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="CCTV" control={<Checkbox onChange={handleCheckBoxChange} />} />
      </div>
    </div>
  );
}
