import { Label, Checkbox } from '@/components/atoms';

export default function EtcFilter() {
  return (
    <div tw="py-5">
      <p tw="text-b1 text-gray-1000 font-bold mb-5">기타</p>
      <div tw="flex gap-4">
        <Label label="급매" control={<Checkbox />} />
        <Label label="갭투자" control={<Checkbox />} />
      </div>
    </div>
  );
}
