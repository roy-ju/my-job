import { Button } from '@/components/atoms';
import CheckIcon from '@/assets/icons/check.svg';
import { TextField } from '@/components/molecules';

export default function ContractAmount() {
  return (
    <div>
      <div tw="flex justify-between mb-4">
        <div tw="text-info">계약금</div>
        <Button size="small" variant="gray">
          <CheckIcon tw="mr-2 text-gray-600" />
          금액 협의 불가
        </Button>
      </div>
      <TextField variant="outlined">
        <TextField.Input label="계약금" />
      </TextField>
    </div>
  );
}
