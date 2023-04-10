import { Checkbox, Label } from '@/components/atoms';

interface AdminFeeProps {
  handleCheckBoxChange?: () => void;
}

export default function AdminFee({ handleCheckBoxChange }: AdminFeeProps) {
  return (
    <div>
      <div tw="text-b1 leading-none font-bold">고정 관리비</div>
      <div tw="mt-4 grid grid-cols-3">
        <Label label="없음" control={<Checkbox onChange={handleCheckBoxChange} />} />
        <Label label="있음" control={<Checkbox onChange={handleCheckBoxChange} />} />
      </div>
    </div>
  );
}
