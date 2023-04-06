import { TextField } from '@/components/molecules';

export default function RemainingAmount() {
  return (
    <div>
      <div>
        <div tw="flex justify-between mb-4">
          <div tw="text-info">잔금</div>
        </div>
        <TextField variant="outlined">
          <TextField.Input label="잔금" />
        </TextField>
      </div>
    </div>
  );
}
