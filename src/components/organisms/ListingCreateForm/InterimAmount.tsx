import { Button } from '@/components/atoms';
import CheckIcon from '@/assets/icons/check.svg';
import { TextField } from '@/components/molecules';
import RemoveIcon from '@/assets/icons/remove.svg';

export default function InterimAmount() {
  return (
    <div>
      <div>
        <div tw="flex justify-between mb-4">
          <div tw="flex items-center gap-1">
            <Button variant="ghost" size="none">
              <RemoveIcon />
            </Button>
            <div tw="text-info">중도금 1</div>
          </div>
          <Button size="small" variant="gray">
            <CheckIcon tw="mr-2 text-gray-600" />
            금액 협의 불가
          </Button>
        </div>
        <TextField variant="outlined">
          <TextField.Input label="중도금" />
        </TextField>
      </div>
    </div>
  );
}
